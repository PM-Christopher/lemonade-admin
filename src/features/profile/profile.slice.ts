import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";

interface userState {
    loading: boolean;
    error: boolean;
    profile: {} | null
}

const initialState: userState = {
    loading: false,
    error: false,
    profile: null
};

const getUserProfile = createAsyncThunk("user/getUserProfile", async ({ token }: { token: any }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/profile`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.profile  = payload?.data?.admin
        });
        builder.addCase(getUserProfile.rejected, (state) => {
            state.loading = false;
        });

    }
});

export { getUserProfile }
export default profileSlice.reducer;