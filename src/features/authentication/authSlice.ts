import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";
import {UserInterface} from "@/interfaces/SystemInterface";

interface authState {
    user: UserInterface | null;
    loading: boolean;
    error: boolean;
    authToken: string | null;
    admin: any;
    adminToken: string | null;
    isLoggedIn: boolean;
    plan: {} | null,
    appSettings: {} | null
}

const initialState: authState = {
    user: null,
    admin: null,
    adminToken: null,
    loading: false,
    error: false,
    authToken: null,
    isLoggedIn: false,
    plan: null,
    appSettings: null
};

const updateUserData = createAsyncThunk("auth/updateUser", async ({ data, token, url }: { data: any, token: string, url: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.patch(`${url}`, data, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const changePassword = createAsyncThunk("auth/changePassword", async ({ data, token }: { data: any, token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.patch(`/profile/settings/change-password`, data, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const deleteAccount = createAsyncThunk("auth/deleteAccount", async ({ data, token }: { data: any, token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.post(`/profile/settings/delete-account`, data, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const updateAppSettings = createAsyncThunk("auth/updateAppSettings", async ({ data, token }: { data: any, token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.patch(`/profile/notification-settings/update-all-notification`, data, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const logout = createAsyncThunk("auth/logout", async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post(`/profile/logout`, {}, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload.admin;
            state.authToken = action.payload.token;
            state.isLoggedIn = true;
        },
        loadStop: (state) => {
            state.loading = false;
        },
        authFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        resetAuth: (state) => {
            state.loading = false;
            state.error = false;
            state.user = null;
            state.authToken = null;
            state.isLoggedIn = true;
            state.admin = null;
        },
        authUser: (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload.user;
        },
        updateHasPin: (state) => {
        },
        updateProfileImage: (state, action) => {
        },
        updateCreatedAccount: (state) => {
        },
        adminUser: (state, action) => {
            state.loading = false;
            state.error = false;
            state.admin = action.payload;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        setSubscriptionId: (state, action) => {
            state.plan = action.payload.plan
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserData.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data.user
        });
        builder.addCase(updateUserData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changePassword.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(changePassword.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAccount.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = null
            state.authToken = null
            state.isLoggedIn = false
        });
        builder.addCase(deleteAccount.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(updateAppSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAppSettings.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.appSettings = payload.data.appSettings
        });
        builder.addCase(updateAppSettings.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.user = null;
            state.authToken = null;
            state.isLoggedIn = false;
        });
        builder.addCase(logout.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const {
    authStart,
    authSuccess,
    authFailure,
    loadStop,
    resetAuth,
    authUser,
    updateHasPin,
    updateCreatedAccount,
    adminUser,
    updateProfileImage,
    updateUser,
    setSubscriptionId
} = authSlice.actions;

export { updateUserData, changePassword, deleteAccount, updateAppSettings, logout }

export default authSlice.reducer;