import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";

interface transactionState {
    loading: boolean;
    error: boolean;
    trxData: {} | null
    subscription: {} | null;
    wallet: {} | null
    event: {} | null
}

const initialState: transactionState = {
    loading: false,
    error: false,
    trxData: null,
    subscription: null,
    wallet: null,
    event: null,
};

const getPlanSubscriptions = createAsyncThunk("transaction/getPlanSubscriptions", async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/transaction/plan-subscription/`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getPlanSubscription = createAsyncThunk("transaction/getPlanSubscription", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/transaction/plan-subscription/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getWalletDetail = createAsyncThunk("transaction/getWalletDetail", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/transaction/wallet-withdrawal/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getEventDetail = createAsyncThunk("transaction/getEventDetail", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/transaction/event/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getTransactionData = createAsyncThunk("transaction/getTransactionData", async ({ token, trxType }: { token: string, trxType: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response;
        switch (trxType) {
            case "plan-subscriptions":
                response = await axiosInstance.get(`/admin/transaction/plan-subscription/`, { headers });
                return response.data;
            case "wallet-withdrawals":
                response = await axiosInstance.get(`/admin/transaction/wallet-withdrawals/`, { headers });
                return response.data;
            case "boosting":
                response = await axiosInstance.get(`/admin/transaction/plan-subscription/`, { headers });
                return response.data;
            case "services":
                response = await axiosInstance.get(`/admin/transaction/plan-subscription/`, { headers });
                return response.data;
            case "events":
                response = await axiosInstance.get(`/admin/transaction/events/`, { headers });
                return response.data;
            case "promotions":
                response = await axiosInstance.get(`/admin/transaction/plan-subscription/`, { headers });
                return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPlanSubscriptions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPlanSubscriptions.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.trxData  = payload?.data
        });
        builder.addCase(getPlanSubscriptions.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getTransactionData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTransactionData.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.trxData  = payload?.data
        });
        builder.addCase(getTransactionData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getPlanSubscription.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPlanSubscription.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.subscription  = payload?.data
        });
        builder.addCase(getPlanSubscription.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getWalletDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getWalletDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.wallet  = payload?.data
        });
        builder.addCase(getWalletDetail.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getEventDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEventDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.event  = payload?.data
        });
        builder.addCase(getEventDetail.rejected, (state) => {
            state.loading = false;
        });
    }
});

export { getPlanSubscriptions, getTransactionData, getPlanSubscription, getWalletDetail, getEventDetail }
export default transactionSlice.reducer;