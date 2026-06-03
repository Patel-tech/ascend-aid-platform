import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Mode = "light" | "dark";
interface ThemeState { mode: Mode }
const initialState: ThemeState = { mode: "dark" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
