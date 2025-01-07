import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone_number: "",
    calling_code: "NG",
    country_code: "+234",
    verifyError: "",
    isLoading: false,
    isRouting: false,
    showSideNav: false,
};

const tempSlice = createSlice({
    name: "temp",
    initialState,
    reducers: {
        updateProperty(state, action) {
            if (action.payload.phone_number) {
                state.phone_number = action.payload.phone_number;
            }
        },
        getTempError(state, action) {
            state.verifyError = action.payload;
        },
        setTempLoading(state, action) {
            state.isLoading = action.payload;
        },
        setShowSideNav(state, action) {
            state.showSideNav = action.payload;
        },
        setIsRouting(state, action) {
            state.isRouting = action.payload;
        },
    },
});

export const {
    updateProperty,
    getTempError,
    setTempLoading,
    setShowSideNav,
    setIsRouting,
} = tempSlice.actions;

export default tempSlice.reducer;
