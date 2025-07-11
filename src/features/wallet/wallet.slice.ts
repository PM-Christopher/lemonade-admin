import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstane";

interface walletState {
  user: {} | null;
  loading: boolean;
  error: boolean;
  walletData: {} | null;
  withdrawalRequests: {} | null;
  walletDetail: {} | null;
}

const initialState: walletState = {
  user: null,
  loading: false,
  error: false,
  walletData: null,
  withdrawalRequests: {},
  walletDetail: null,
};

const getWalletData = createAsyncThunk(
  "wallet/getWalletData",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axiosInstance.get(`/admin/wallet`, { headers });
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const getWithdrawalRequest = createAsyncThunk(
  "wallet/getWithdrawalRequest",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axiosInstance.get(
        `/admin/transaction/wallet-withdrawals`,
        { headers }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const getWalletDetail = createAsyncThunk(
  "wallet/getWalletDetail",
  async ({ token, id }: { token: string; id: number }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axiosInstance.get(
        `/admin/transaction/wallet-withdrawal/${id}`,
        { headers }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const updateWithdrawalThreshold = createAsyncThunk(
  "wallet/updateThreshold",
  async (
    {
      token,
      threshold,
    }: {
      token: string;
      threshold: string;
    },
    { rejectWithValue }
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      threshold: parseInt(threshold),
    };

    try {
      let response = await axiosInstance.patch(
        `/admin/wallet/update-withdrawal-threshold`,
        payload,
        {
          headers,
        }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const withdrawalRequestDecison = createAsyncThunk(
  "wallet/requestDecision",
  async (
    {
      token,
      type,
      id,
    }: {
      token: string;
      type: string;
      id: any;
    },
    { rejectWithValue }
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      type: type,
    };

    try {
      let response = await axiosInstance.patch(
        `/admin/wallet/user/${id}/withdrawal-request`,
        payload,
        {
          headers,
        }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const withdrawaladdition = createAsyncThunk(
  "wallet/add",
  async (
    {
      token,
      amount,
      id,
    }: {
      token: string;
      amount: string;
      id: any;
    },
    { rejectWithValue }
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      amount: amount,
    };

    try {
      let response = await axiosInstance.patch(
        `/admin/wallet/user/${id}/add`,
        payload,
        {
          headers,
        }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);



const withdrawaldeduction = createAsyncThunk(
  "wallet/deduct",
  async (
    {
      token,
      amount,
      id,
    }: {
      token: string;
      amount: string;
      id: any;
    },
    { rejectWithValue }
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      amount: amount,
    };

    try {
      let response = await axiosInstance.patch(
        `/admin/wallet/user/${id}/deduct`,
        payload,
        {
          headers,
        }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWalletData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWalletData.fulfilled, (state, { payload }) => {
      state.loading = false;
      // store metrics
      state.walletData = payload?.data;
    });
    builder.addCase(getWalletData.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getWithdrawalRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWithdrawalRequest.fulfilled, (state, { payload }) => {
      state.loading = false;
      // store metrics
      state.withdrawalRequests = payload?.data;
    });
    builder.addCase(getWithdrawalRequest.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getWalletDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWalletDetail.fulfilled, (state, { payload }) => {
      state.loading = false;
      // store wallet detail
      state.walletDetail = payload.data;
    });
    builder.addCase(getWalletDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export {
  getWalletData,
  getWithdrawalRequest,
  getWalletDetail,
  updateWithdrawalThreshold,
  withdrawalRequestDecison,
  withdrawaladdition,
  withdrawaldeduction
};
export default walletSlice.reducer;
