import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstane";

interface Promotion {
    id: number;
    name: string;
    price: number;
    price_option: string;
    breakdown: string[];
    // other fields...
}

interface PromotionState {
    loading: boolean;
    error: boolean;
    promotionData: {
        promotions: Promotion[];
    } | null;
    promotion: {} | null;
    promotionAction: {} | null;
}

const initialState: PromotionState = {
    loading: false,
    error: false,
    promotionData: { promotions: [] },
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

export const getPromotion = createAsyncThunk(
    "promotion/getPromotion",
    async ({ token, id }: { token: any, id: any }, { rejectWithValue }) => {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            let response = await axiosInstance.get(`/admin/promotions/${id}`, { headers });
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const updatePromotion = createAsyncThunk(
    "promotion/updatePromotion",
    async ({ token, id, data }: { token: any, id: any, data: any }, { rejectWithValue }) => {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            let response = await axiosInstance.patch(`/admin/promotions/${id}`, data, { headers });
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
    reducers: {
        clearPromotion: (state) => {
            state.promotion = null;
        }
    },
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
                if (payload.status) {
                    if (state.promotionData) {
                        state.promotionData.promotions.unshift(payload.data.promotion);
                    } else {
                        // If promotionData is null (like on first load), initialize it
                        state.promotionData = { promotions: [payload.data.promotion] };
                    }
                }
            })
            .addCase(createPromotion.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            // Handle getPromotion
            .addCase(getPromotion.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPromotion.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.promotion = payload?.data;
            })
            .addCase(getPromotion.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            // Handle updatePromotion
            .addCase(updatePromotion.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updatePromotion.fulfilled, (state, { payload }) => {
                state.loading = false;
                console.log({
                    status: payload.status,
                    stateProm: state.promotionData.promotions
                })
                if (payload.status && state.promotionData?.promotions) {
                    const updatedPromotion = payload.data.promotion;
                    console.log({promotion: payload?.data?.promotion})

                    state.promotionData.promotions = state.promotionData.promotions.map((item) =>
                        item.id === updatedPromotion.id ? updatedPromotion : item
                    );
                }
            })
            .addCase(updatePromotion.rejected, (state) => {
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
                if (state.promotionData && payload.status) {
                    const deletedId = payload.data.id;

                    state.promotionData.promotions = state.promotionData.promotions.filter(
                        (item) => item.id !== deletedId
                    );
                }
            })
            .addCase(deletePromotion.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export const {
    clearPromotion,
} = promotionSlice.actions;

export default promotionSlice.reducer;