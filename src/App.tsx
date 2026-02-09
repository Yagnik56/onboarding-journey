import { Provider, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store, RootState } from "@/store";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector((s: RootState) => s.auth.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const isLoggedIn = useSelector((s: RootState) => s.auth.isLoggedIn);
  const isCompleted = useSelector((s: RootState) => s.onboarding.isCompleted);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            isCompleted ? <Navigate to="/home" replace /> : <Navigate to="/onboarding" replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isLoggedIn ? (
            isCompleted ? <Navigate to="/home" replace /> : <Navigate to="/onboarding" replace />
          ) : (
            <SignUpPage />
          )
        }
      />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            {isCompleted ? <Navigate to="/home" replace /> : <OnboardingPage />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            {isCompleted ? <HomePage /> : <Navigate to="/onboarding" replace />}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
