// after approving the payment that payment will be stored here
// includes amount payed who paid the amount
// when was the amount payed
// just to maintain the previos record
// we could have maintained a log file for this also just like google spreadsheet
// but why not use the database for this purpose

import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema({
  amount: Number,
  user: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Commission = mongoose.model("Commission", commissionSchema);
