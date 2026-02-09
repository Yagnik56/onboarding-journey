import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setPayment, setStep } from "@/store/onboardingSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const formatCardNumber = (val: string) => {
  const digits = val.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (val: string) => {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
};

const StepPayment = () => {
  const dispatch = useDispatch();
  const payment = useSelector((s: RootState) => s.onboarding.payment);
  const [cardNumber, setCardNumber] = useState(payment.cardNumber);
  const [expiryDate, setExpiryDate] = useState(payment.expiryDate);
  const [cvv, setCvv] = useState(payment.cvv);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const cardDigits = cardNumber.replace(/\D/g, "");
    const cvvDigits = cvv.replace(/\D/g, "");

    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardDigits.length !== 16) {
      newErrors.cardNumber = "Enter valid card number";
    }

    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const match = expiryDate.match(/^(\d{2})\/(\d{2})$/);

      if (!match) {
        newErrors.expiryDate = "Enter valid expiry";
      } else {
        const month = parseInt(match[1], 10);
        const year = parseInt(match[2], 10) + 2000;

        if (month < 1 || month > 12) {
          newErrors.expiryDate = "Enter valid expiry";
        } else {
          const now = new Date();
          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear();

          if (year < currentYear || (year === currentYear && month < currentMonth)) {
            newErrors.expiryDate = "Enter valid expiry";
          }
        }
      }
    }

    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!(cvvDigits.length === 2 || cvvDigits.length === 3)) {
      newErrors.cvv = "Enter valid cvv";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) {
      toast({ title: "Please fill in all payment fields", variant: "destructive" });
      return;
    }
    dispatch(setPayment({ cardNumber, expiryDate, cvv }));
    dispatch(setStep(4));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Payment Information</h2>
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className={cn(errors.cardNumber && "border-destructive")}
        />
        {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className={cn(errors.expiryDate && "border-destructive")}
          />
          {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
            placeholder="123"
            maxLength={3}
            className={cn(errors.cvv && "border-destructive")}
          />
          {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch(setStep(2))}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default StepPayment;
