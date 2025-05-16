import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstane";

const getCSV = createAsyncThunk(
  "utils/getCSV",
  async (
    { token, table }: { token: string; table: string },
    { rejectWithValue }
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axiosInstance.get(
        `/admin/export?table=${table}&type=csv`,
        { headers }
      );
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const exportSlice = createSlice({
  name: "exports",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCSV.pending, (state) => {
    //   state.loading = true;
    });
    builder.addCase(getCSV.fulfilled, (state, { payload }) => {
    //   state.loading = false;
      // store data
    //   state.user = payload?.data?.user;
    });
    builder.addCase(getCSV.rejected, (state) => {
    //   state.loading = false;
    });
  },
});

export { getCSV };

export default exportSlice.reducer;
