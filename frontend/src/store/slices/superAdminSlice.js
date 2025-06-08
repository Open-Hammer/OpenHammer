import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { stat } from "fs";
import { act } from "react";
import { getAllAuctionItems } from "./auctionSlice";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    requestForMonthlyRevenue(state, action) {
      (state.loading = true), (state.monthlyRevenue = []);
    },
    successForMonthlyRevenue(state, action) {
      (state.loading = false), (state.monthlyRevenue = action.payload);
    },
    failedForMonthlyRevenue(state, action) {
      (state.loading = false), (state.monthlyRevenue = []);
    },
    requestForAllUsers(state, action) {
      state.loading = true;
      (state.totalAuctioneers = []), (state.totalBidders = []);
    },
    successForAllUsers(state, action) {
      state.loading = false;
      (state.totalAuctioneers = state.action.payload.autioneersArray),
        (state.totalBidders = state.action.payload.biddersArray);
    },
    failedForAllUsers(state, action) {
      state.loading = false;
      (state.totalAuctioneers = []), (state.totalBidders = []);
    },
    requestForPaymentProofs(state, action) {
      (state.loading = true), (state.paymentProofs = []);
    },
    successForPaymentProofs(state, action) {
      (state.loading = false), (state.paymentProofs = action.payload);
    },
    failedForPaymentProofs(state, action) {
      state.loading = false;
      state.paymentProofs = [];
    },
    requestForDeletePaymentProof(state, action) {
      state.loading = true;
    },
    successForDeletePaymentProof(state, action) {
      state.loading = false;
    },
    failedForDeletePaymentProof(state, action) {
      state.loading = false;
    },
    requestForSinglePaymentProofDetails(state, action) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    successForSinglePaymentProofDetails(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failedForSinglePaymentProofDetails(state, action) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    requestForUpdatePaymentProof(state, action) {
      state.loading = true;
    },
    successForUpdatePaymentProof(state, action) {
      state.loading = false;
    },
    failedForUpdatePaymentProof(state, action) {
      state.loading = false;
    },
    requestForAuctionItemDelete(state, action) {
      state.loading = true;
    },
    successForAuctionItemDelete(state, action) {
      state.loading = true;
    },
    failedForAuctionItemDelete(state, action) {
      state.loading = true;
    },
    clearAllErrors(state, action) {
      (state.loading = false), (state.monthlyRevenue = state.monthlyRevenue);
      state.paymentProofs = state.paymentProofs;
      state.totalAuctioneers = state.totalAuctioneers;
      state.totalBidders = state.totalBidders;
      state.singlePaymentProof = {};
    },
  },
});

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await axios.get(
      "http://loacalhost:5000/api/v1/superadmin/monthlyincome",
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForMonthlyRevenue());
    console.error(error.response.data.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAllUsers());
  try {
    const response = await axios.get(
      "http://loacalhost:5000/api/v1/superadmin/users/getall",
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForAllUsers(response.data));
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForAllUsers());
    console.error(error.response.data.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForPaymentProofs());
  try {
    const response = await axios.get(
      "http://loacalhost:5000/api/v1/superadmin/paymentproofs/getall",
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForPaymentProofs(
        response.data.paymentProof
      )
    );
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForPaymentProofs());
    console.error(error.response.data.message);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForDeletePaymentProof());
  try {
    const response = await axios.delete(
      `http://loacalhost:5000/api/v1/superadmin/paymentproofs/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForDeletePaymentProof());
    dispatch(getAllPaymentProofs());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForDeletePaymentProof());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForSinglePaymentProofDetails());
  try {
    const response = await axios.get(
      `http://loacalhost:5000/api/v1/superadmin/paymentproof/${id}`,
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForSinglePaymentProofDetails(
        response.data.paymentProofDetail
      )
    );
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForSinglePaymentProofDetails());
    console.error(error.response.data.message);
  }
};

export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForUpdatePaymentProof());
  try {
    const response = await axios.put(
      `http://loacalhost:5000/api/v1/superadmin/paymentproof/status/update/${id}`,
      { status, amount },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(superAdminSlice.actions.successForUpdatePaymentProof());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForUpdatePaymentProof());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAuctionItemDelete());
  try {
    const response = await axios.delete(
      `http://loacalhost:5000/api/v1/superadmin/paymentproof/status/update/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForAuctionItemDelete());
    toast.success(response.data.message);
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(superAdminSlice.actions.failedForAuctionItemDelete());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const clearAllSuperAdminSliceErrors = () => (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;
