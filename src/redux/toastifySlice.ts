import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    showToast: {
        show: boolean;
        message: string;
        type: string;
    };
};

const initialState: initialStateType = {
    showToast: {
        show: false,
        message: "",
        type: "success",
    },
};

const toastifySlice = createSlice({
    initialState,
    name: "toastify",
    reducers: {
        /**
         *
         * @param state The initial state of the overall current reducer
         * @param action This contains the payload used to update the current reducer
         * @returns The updated state
         */
        updateToastifyReducer(state, action) {
            return {
                ...state,
                showToast: { ...action.payload },
            };
        },
    },
});

export const { updateToastifyReducer } = toastifySlice.actions;
export default toastifySlice.reducer;
