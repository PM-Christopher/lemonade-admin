import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";
import {PlatformStatistics} from "@/interfaces/SystemInterface";

interface chatState {
    user: {} | null;
    loading: boolean;
    error: boolean;
    metrics: PlatformStatistics | null
}

const initialState: chatState = {
    user: null,
    loading: false,
    error: false,
    metrics: null
};

const getMetrics = createAsyncThunk("dashboard/getMetrics", async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/dashboard`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const connectSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMetrics.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMetrics.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store metrics
            state.metrics  = payload?.data
        });
        builder.addCase(getMetrics.rejected, (state) => {
            state.loading = false;
        });
    }
});

export { getMetrics }
export default connectSlice.reducer;