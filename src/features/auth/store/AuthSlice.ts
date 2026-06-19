import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "section",
    initialState: {
        loggedInUser: {
            id: '',
            email:''
        }
  },
    reducers: {
        SetLoggedInUser: (state: any, action: any) => {
            state.loggedInUser = action.payload;
        },
    }
});

export const { SetLoggedInUser } = AuthSlice.actions;

export default AuthSlice.reducer;