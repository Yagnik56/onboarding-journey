import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import onboardingReducer from "./onboardingSlice";

const STORAGE_KEY = "onboarding-app-state";

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
});

function loadState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized) return JSON.parse(serialized);
  } catch {
    // ignore
  }
  return undefined;
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch {
    // ignore
  }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
