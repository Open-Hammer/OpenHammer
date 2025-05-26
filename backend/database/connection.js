import mongoose from "mongoose";
export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "openHammer",
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("some erro occured");
    });
};
