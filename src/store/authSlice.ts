import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User { name: string; email: string; role: "user" | "admin"; avatar?: string }
interface AuthState { user: User | null }

const initialState: AuthState = {
  user: { name: "Aarav Patel", email: "aarav@interviewai.dev", role: "admin" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) { state.user = null; },
    login(state) {
      state.user = { name: "Aarav Patel", email: "aarav@interviewai.dev", role: "admin" };
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { logout, login, updateUser } = authSlice.actions;
export default authSlice.reducer;
