import { createSlice } from "@reduxjs/toolkit";


const RouterSlice = createSlice({
    name: "template",
    initialState: {
        currentRoute: "",
        lastVisitedRoute: "",
    },
    reducers: {
        setLastVisitedRoute: (state, action) => {
            state.lastVisitedRoute = action.payload;
        }
    },
});

export const { setLastVisitedRoute } = RouterSlice.actions;

export default RouterSlice.reducer;
