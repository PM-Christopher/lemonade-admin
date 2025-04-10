import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstane";


interface teamState {
    loading: boolean;
    error: boolean;
    teamData: {} | null
    team: {} | null
}

const initialState: teamState = {
    loading: false,
    error: false,
    teamData: null,
    team: null
};

const getTeamData = createAsyncThunk("team/getTeamData", async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.get(`/admin/team-members`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const getTeamDetail = createAsyncThunk("team/getTeamDetail", async ({ token, id }: { token: string, id: number }, { rejectWithValue }) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    try {
        let response = await axiosInstance.get(`/admin/team-members/${id}`, { headers });
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data);
    }
});

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTeamData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTeamData.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.teamData  = payload?.data
        });
        builder.addCase(getTeamData.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getTeamDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTeamDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            // store data
            state.team  = payload?.data?.team
        });
        builder.addCase(getTeamDetail.rejected, (state) => {
            state.loading = false;
        });

    }
});

export { getTeamData, getTeamDetail }
export default teamSlice.reducer;