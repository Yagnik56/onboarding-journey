import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepIndicator from "@/components/onboarding/StepIndicator";
import StepProfile from "@/components/onboarding/StepProfile";
import StepSongs from "@/components/onboarding/StepSongs";
import StepPayment from "@/components/onboarding/StepPayment";
import StepSuccess from "@/components/onboarding/StepSuccess";

const TOTAL_STEPS = 4;

const OnboardingPage = () => {
  const currentStep = useSelector((s: RootState) => s.onboarding.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepProfile />;
      case 2: return <StepSongs />;
      case 3: return <StepPayment />;
      case 4: return <StepSuccess />;
      default: return <StepProfile />;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Onboarding</CardTitle>
          <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
