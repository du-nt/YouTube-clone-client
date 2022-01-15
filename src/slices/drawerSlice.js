import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: true };

const user = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        toggleDrawer: (state, { payload }) => {
            payload ? state.isOpen = payload :
                state.isOpen = !state.isOpen;
        },
    },
});

const { reducer, actions } = user;
export const { toggleDrawer } = actions;
export default reducer;
