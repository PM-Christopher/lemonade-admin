import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";


interface announcementState {
    loading: boolean;
    error: boolean;
    announcementData: {} | null
    announcement: {} | null
}

const initialState: announcementState = {
    loading: false,
    error: false,
    announcementData: null,
    announcement: null
};

const getAnnouncementData = createAsyncThunk("announcement/getAnnouncementData", async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.get(`/admin/announcement`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getAnnouncementDetail = createAsyncThunk("announcement/getAnnouncementDetail", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.get(`admin/announcement/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const announcementSlice = createSlice({
    name: "announcement",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAnnouncementData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAnnouncementData.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.announcementData  = payload?.data
        });
        builder.addCase(getAnnouncementData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getAnnouncementDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAnnouncementDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.announcement  = payload?.data?.announcement
        });
        builder.addCase(getAnnouncementDetail.rejected, (state) => {
            state.loading = false;
        });

    }
});

export { getAnnouncementData, getAnnouncementDetail }
export default announcementSlice.reducer;