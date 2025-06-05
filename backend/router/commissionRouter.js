import express from "express";
import { proofOfcommission } from "../controllers/commissionController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/proof",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  proofOfcommission
);
export default router;
