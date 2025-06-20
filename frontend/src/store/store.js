import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import commissionReducer from "./slices/commissionSlice";
import auctionReducer from "./slices/auctionSlice";
import superAdminReducer from "./slices/superAdminSlice";
import bidReducer from "./slices/bidSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    commission: commissionReducer,
    auction: auctionReducer,
    superAdmin: superAdminReducer,
    bid: bidReducer,
  },
});
