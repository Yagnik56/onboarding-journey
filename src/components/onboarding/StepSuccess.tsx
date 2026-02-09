import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { completeOnboarding } from "@/store/onboardingSlice";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const StepSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoHome = () => {
    dispatch(completeOnboarding());
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <CheckCircle className="h-16 w-16 text-primary" />
      <h2 className="text-2xl font-semibold">You're All Set!</h2>
      <p className="text-center text-muted-foreground">
        Your onboarding is complete. Welcome aboard!
      </p>
      <Button onClick={handleGoHome}>Go to Home</Button>
    </div>
  );
};

export default StepSuccess;
