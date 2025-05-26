import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstane";

interface PromotionState {
    loading: boolean;
    error: boolean;
    promotionData: {} | null;
    promotion: {} | null;
    promotionAction: {} | null;
}

const initialState: PromotionState = {
    loading: false,
    error: false,
    promotionData: null,
    promotion: null,
    promotionAction: null,
};

export const getPromotionData = createAsyncThunk(
    "promotion/getPromotions", 
    async ({ token }: { token: string }, { rejectWithValue }) => {
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
    }
);

export const createPromotion = createAsyncThunk(
    "promotion/createPromotion", 
    async ({ token, data }: { token: string, data: any }, { rejectWithValue }) => {
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
    }
);

export const deletePromotion = createAsyncThunk(
    "promotion/deletePromotion", 
    async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
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
    }
);

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle getPromotionData
        builder
            .addCase(getPromotionData.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPromotionData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.promotionData = payload?.data;
            })
            .addCase(getPromotionData.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            
            // Handle createPromotion
            .addCase(createPromotion.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createPromotion.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.promotion = payload?.data;
            })
            .addCase(createPromotion.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            
            // Handle deletePromotion
            .addCase(deletePromotion.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deletePromotion.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.promotionAction = payload?.data; // Store in promotionAction instead of promotion
            })
            .addCase(deletePromotion.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export default promotionSlice.reducer;