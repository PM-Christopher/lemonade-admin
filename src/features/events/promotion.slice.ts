import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";


interface promotionState {
    loading: boolean;
    error: boolean;
    promotionData: {} | null
    promotion: {} | null
    promotionAction: {} | null
}

const initialState: promotionState = {
    loading: false,
    error: false,
    promotionData: null,
    promotion: null,
    promotionAction: null,
};

const getPromotionData = createAsyncThunk("promotion/getPromotions", async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.get(`/admin/promotions`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const createPromotion = createAsyncThunk("promotion/createPromotion", async ({ token, data }: { token: string, data: any }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.post(`/admin/promotions`, data, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const deletePromotion = createAsyncThunk("promotion/deletePromotion", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.delete(`/admin/promotions/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getPromotionData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPromotionData.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.promotionData  = payload?.data
        });
        builder.addCase(getPromotionData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createPromotion.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPromotion.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.promotion  = payload?.data
        });
        builder.addCase(createPromotion.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deletePromotion.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePromotion.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.promotion  = payload?.data
        });
        builder.addCase(deletePromotion.rejected, (state) => {
            state.loading = false;
        });

    }
});

export { getPromotionData, createPromotion, deletePromotion }
export default promotionSlice.reducer;