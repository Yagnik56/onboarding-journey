import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisteredUser {
  username: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  registeredUsers: RegisteredUser[];
}

const DEMO_USERNAME = "user123";
const DEMO_PASSWORD = "password123";

const initialState: AuthState = {
  isLoggedIn: false,
  username: "",
  registeredUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = "";
    },
    register(state, action: PayloadAction<RegisteredUser>) {
      state.registeredUsers.push(action.payload);
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export { DEMO_USERNAME, DEMO_PASSWORD };
export default authSlice.reducer;
