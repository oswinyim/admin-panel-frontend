import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  userData: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      console.trace();
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserData: (state, actions) => {
      state.userData = actions.payload
    },
  },
});

export const { setMode, setUserData } = globalSlice.actions;

export default globalSlice.reducer;
