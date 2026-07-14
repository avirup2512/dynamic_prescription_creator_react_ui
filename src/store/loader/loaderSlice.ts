import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoaderState {
    open: boolean;
    title: string;
    description: string;
    progress?: number;
    showProgress: boolean;
}

export type LoaderPayload = Partial<LoaderState>;

const initialState: LoaderState = {
    open: false,
    title: "Loading...",
    description: "Please wait while we finish the request.",
    showProgress: false,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        showLoader: (state, action: PayloadAction<LoaderPayload | undefined>) => {
            state.open = true;

            if (action.payload) {
                Object.assign(state, action.payload);
            }
        },
        hideLoader: (state) => {
            state.open = false;
        },
        updateLoader: (state, action: PayloadAction<LoaderPayload | undefined>) => {
            if (action.payload) {
                Object.assign(state, action.payload);
            }
        },
        resetLoader: () => initialState,
    },
});

export const { showLoader, hideLoader, updateLoader, resetLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
