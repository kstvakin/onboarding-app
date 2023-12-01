import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    id: number;
    auth: boolean;
};

const initialState = {
    id: 0,
    auth: false
} as UserState;

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState,
        authenticate: (state, action) => {
            state.id = action.payload;
            state.auth = true
        }
    },
});

export const {
    authenticate,
    reset
} = user.actions;
export default user.reducer;
