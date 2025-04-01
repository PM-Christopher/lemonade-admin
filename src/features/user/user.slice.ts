import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";

interface userState {
    loading: boolean;
    error: boolean;
    userData: {} | null
    user: {} | null;
    userDetail: {} | null
    userAction: {} | null
}

const initialState: userState = {
    loading: false,
    error: false,
    userData: null,
    user: null,
    userDetail: null,
    userAction: null
};

const getUserData = createAsyncThunk("user/getUserData", async ({ token, trxType }: { token: string, trxType: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response;
        switch (trxType) {
            case "users":
                response = await axiosInstance.get(`/admin/users`, { headers });
                return response.data;
            case "affiliates":
                response = await axiosInstance.get(`/admin/affiliates`, { headers });
                return response.data;
            default:
                response = await axiosInstance.get(`/admin/users`, { headers });
                return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getUserDetail = createAsyncThunk("user/getUserDetail", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/users/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getAccountInfo = createAsyncThunk("user/getAccountInfo", async ({ token, id, infoType }: { token: string, id: number, infoType: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response;
        switch (infoType) {
            case "activities-log":
                response = await axiosInstance.get(`/admin/users/${id}/user-logs`, { headers });
                return response.data;
            case "tribes":
                response = await axiosInstance.get(`/admin/users/${id}/user-tribes`, { headers });
                return response.data;
            case "business":
                response = await axiosInstance.get(`/admin/users/${id}/user-logs`, { headers });
                return response.data;
            case "events":
                response = await axiosInstance.get(`/admin/users/${id}/user-events`, { headers });
                return response.data;
            case "wallet":
                response = await axiosInstance.get(`/admin/users/${id}/user-wallet`, { headers });
                return response.data;
            default:
                response = await axiosInstance.get(`/admin/users/${id}/user-logs`, { headers });
                return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const userAction = createAsyncThunk("user/userAction", async ({ token, id, actionType }: { token: string, id: number, actionType: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response;
        switch (actionType) {
            case "suspend":
                response = await axiosInstance.patch(`/admin/users/${id}/suspend-user`, {}, { headers });
                return response.data;
            case "deactivate":
                response = await axiosInstance.patch(`/admin/users/${id}/deactivate-user`, {}, { headers });
                return response.data;
            case "reactivate":
                response = await axiosInstance.patch(`/admin/users/${id}/reactivate-user`, {}, { headers });
                return response.data;
            default:
                response = await axiosInstance.patch(`/admin/users/${id}/suspend-user`, {}, { headers });
                return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserData.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.userData  = payload?.data
        });
        builder.addCase(getUserData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getUserDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.user  = payload?.data?.user
        });
        builder.addCase(getUserDetail.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getAccountInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAccountInfo.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.userDetail  = payload?.data
        });
        builder.addCase(getAccountInfo.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(userAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userAction.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.userAction  = payload?.data
        });
        builder.addCase(userAction.rejected, (state) => {
            state.loading = false;
        });

    }
});

export { getUserData, getUserDetail, getAccountInfo, userAction }
export default userSlice.reducer;