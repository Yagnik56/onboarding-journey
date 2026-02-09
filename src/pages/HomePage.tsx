import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";
import { resetOnboarding } from "@/store/onboardingSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((s: RootState) => s.onboarding.profile);

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    navigate("/");
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20">
              {profile.profilePicture ? (
                <AvatarImage src={profile.profilePicture} alt={profile.name} />
              ) : null}
              <AvatarFallback className="text-xl">{initials || "U"}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">Welcome, {profile.name || "User"}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your onboarding is complete. You're all set!
          </p>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
