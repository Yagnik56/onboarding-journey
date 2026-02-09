import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileData {
  name: string;
  age: string;
  email: string;
  profilePicture: string;
}

interface SongsData {
  songs: string[];
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  profile: ProfileData;
  songs: SongsData;
  payment: PaymentData;
}

const initialState: OnboardingState = {
  currentStep: 1,
  isCompleted: false,
  profile: { name: "", age: "", email: "", profilePicture: "" },
  songs: { songs: [""] },
  payment: { cardNumber: "", expiryDate: "", cvv: "" },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setProfile(state, action: PayloadAction<ProfileData>) {
      state.profile = action.payload;
    },
    setSongs(state, action: PayloadAction<SongsData>) {
      state.songs = action.payload;
    },
    setPayment(state, action: PayloadAction<PaymentData>) {
      state.payment = action.payload;
    },
    completeOnboarding(state) {
      state.isCompleted = true;
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const { setStep, setProfile, setSongs, setPayment, completeOnboarding, resetOnboarding } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
