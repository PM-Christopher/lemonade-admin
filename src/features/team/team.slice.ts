import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstane";

interface TeamState {
  loading: boolean;
  error: boolean;
  teamData: {} | null;
  team: {} | null;
}

const initialState: TeamState = {
  loading: false,
  error: false,
  teamData: null,
  team: null,
};

export const getTeamData = createAsyncThunk(
  "team/getTeamData",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await axiosInstance.get(`/admin/team-members`, {
        headers,
      });
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTeamDetail = createAsyncThunk(
  "team/getTeamDetail",
  async ({ token, id }: { token: string; id: number }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await axiosInstance.get(`/admin/team-members/${id}`, {
        headers,
      });
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addTeamMember = createAsyncThunk(
  "team/addTeamMember", // Changed this action type name
  async (
    {
      token,
      name,
      email,
      password,
      role,
    }: {
      token: string;
      name: string;
      email: string;
      password: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      let response = await axiosInstance.post(`/admin/team-members/`, payload, {
        headers,
      });
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getTeamData
      .addCase(getTeamData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTeamData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teamData = payload?.data;
      })
      .addCase(getTeamData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
      // Handle getTeamDetail
      .addCase(getTeamDetail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTeamDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload?.data?.team;
      })
      .addCase(getTeamDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
      // Handle addTeamMember
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTeamMember.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload?.data;
      })
      .addCase(addTeamMember.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default teamSlice.reducer;