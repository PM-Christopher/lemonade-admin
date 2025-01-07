import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";

interface generalState {
    loading: boolean;
    error: boolean;
    account: null;
}

const initialState: generalState = {
    loading: false,
    error: false,
    account: null
};

const verifyAccount = createAsyncThunk("general/verifyAccount", async ({ bank_code, account_number }: {bank_code: string, account_number: string}, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`/verify-account`, {
            bank_code,
            account_number
        });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(verifyAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyAccount.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(verifyAccount.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const {  } = generalSlice.actions
export { verifyAccount }
export default generalSlice.reducer;