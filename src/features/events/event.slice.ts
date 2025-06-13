import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";


interface eventState {
    loading: boolean;
    error: boolean;
    eventData: {} | null
    event: {} | null
    eventAction: {} | null
}

const initialState: eventState = {
    loading: false,
    error: false,
    eventData: null,
    event: null,
    eventAction: null,
};

const getEventData = createAsyncThunk("event/getEventData", async ({ token, trxType }: { token: string, trxType: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response;
        switch (trxType) {
            case "events":
                response = await axiosInstance.get(`/admin/events`, { headers });
                return response.data;
            case "affiliates":
                response = await axiosInstance.get(`/admin/affiliates`, { headers });
                return response.data;
            case "promotions":
                response = await axiosInstance.get(`/admin/event-promotions`, { headers });
                return response.data;
            default:
                response = await axiosInstance.get(`/admin/events`, { headers });
                return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getEventDetail = createAsyncThunk("event/getEventDetail", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.get(`/admin/events/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const eventAction = createAsyncThunk("event/eventAction", async ({ token, id, actionType }: { token: string, id: number, actionType: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response;
        switch (actionType) {
            case "suspend":
                response = await axiosInstance.patch(`/admin/events/${id}/suspend-event`, {}, { headers });
                return response.data;
            case "activate":
                response = await axiosInstance.patch(`/admin/events/${id}/activate-event`, {}, { headers });
                return response.data;
            case "delete":
                response = await axiosInstance.delete(`/admin/events/${id}/delete-event`, { headers });
                return response.data;
            default:
                response = await axiosInstance.patch(`/admin/events/${id}/suspend-event`, {}, { headers });
                return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const updateCommissionCharge = createAsyncThunk("event/updateCommissionCharge", async ({ token, data }: { token: any, data: any }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axiosInstance.patch(`/admin/events/update-commission-charge`, data, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getEventData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEventData.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.eventData  = payload?.data
        });
        builder.addCase(getEventData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getEventDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEventDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.event = payload?.data
        });
        builder.addCase(getEventDetail.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(eventAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(eventAction.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.eventAction  = payload?.data
        });
        builder.addCase(eventAction.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(updateCommissionCharge.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCommissionCharge.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(updateCommissionCharge.rejected, (state) => {
            state.loading = false;
        });
    }
});

export { getEventData, getEventDetail, eventAction, updateCommissionCharge }
export default eventSlice.reducer;