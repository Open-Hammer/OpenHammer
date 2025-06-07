import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import User from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { calculateCommission } from "../controllers/commissionController.js";
import { sendEmail } from "../utils/sendEmail.js";
// import { setMaxListeners } from "nodemailer/lib/xoauth2/index.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("shivam..");
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
        const auctioneer = await User.findById(auction.createdBy);
        auctioneer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            {
              new: true,
            }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          const subject = `Congratulations you have won the auciton for ${auction.title}`;
          const message = `Dear ${bidder.userName},\n\nCongratulations! You have won the auction for
          ${auction.title}. \n\nBefore proceeding for the payment contact your auctioneer via your auctioneer
          email:${auctioneer.email} \n\nPlease complete your payment using one of the following methods: 
          \n\n1: **Bank Transfer**: \n- Account Name:${auctioneer.paymentMethods.bankTransfer.bankAccountName}
          \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}
          payment via UPI:${auctioneer.paymentMethods.upiId}\n\n3.
          **Delivery (COD)**:\n If you prefer COD,you must pay 20% of the total amount upfront before delivery.\n-
           To pay the 20% upfront, use any of the above methods, \n-
             The remaining 80% will be paid upon delievery. \n-If you want to see the condition of your auction item then send 
             your email on this : ${auctioneer.email}\n\n Please ensure your payments is completed by [Payment Due Date].
              Once we confim the payment, the item will be shipped to you.\n\n Thank you for pariticipating!
          \n\nBest regards,\nShivam Aucton Team`;
          console.log("Sending email to the highest bidder");
          sendEmail({ email: bidder.email, subject, message });
          console.log("email sent to the highest bidder");
        } else {
          await auction.save();
        }
      } catch (error) {
        console.error(
          `Error in endedAuctionCron for auction ${auction._id}:`,
          error
        );
      }
    }
  });
};
