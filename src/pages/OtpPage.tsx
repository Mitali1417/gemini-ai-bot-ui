import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpForm from "../components/auth/OtpForm";
import { useAuthStore } from "../components/store/store";
import { saveAuth } from "../components/store/store";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useVerifyOtp } from "../components/hooks/useOtp";
import AuthLayout from "@/components/shared/AuthLayout";

const OtpPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sendOTP = useAuthStore((s) => s.sendOTP);
  const verifyOtpMutation = useVerifyOtp();
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { phone, country, mode } = (location.state || {}) as {
    phone?: string;
    country?: string;
    mode?: string;
  };
  const setAuth = useAuthStore.setState;

  React.useEffect(() => {
    if (!phone || !country) {
      navigate("/signin", { replace: true });
    }
  }, [phone, country, navigate]);

  const handleOtpSubmit = (otp: string) => {
    setLoading(true);
    verifyOtpMutation.mutate(otp, {
      onSuccess: () => {
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAuth((prev: any) => {
          const newState = {
            ...prev,
            user: {
              id: Date.now().toString(),
              phone: phone!,
              country: country!,
            },
            isLoggedIn: true,
          };
          saveAuth(newState);
          return newState;
        });
        toast.success("Logged in successfully!");
        navigate("/");
      },
      onError: () => {
        setLoading(false);
        toast.error("Invalid OTP. Try 123456.");
      },
    });
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      sendOTP(phone!, country!);
      setLoading(false);
      setResendTimer(30);
      toast.success("OTP resent! (use 123456)");
    }, 1000);
  };

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatPhoneNumber = (phone: string, country: string) => {
    return `${country} ${phone}`;
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light mb-2">Enter verification code</h1>
        <p className="mb-2">We sent a code to</p>
        <p className="font-medium">
          {phone && country && formatPhoneNumber(phone, country)}
        </p>
      </div>
      <Card>
        <CardContent>
          <OtpForm
            onSubmit={handleOtpSubmit}
            onResend={handleResend}
            loading={loading}
            resendTimer={resendTimer}
          />
        </CardContent>
      </Card>
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(mode === "signup" ? "/signup" : "/signin")}
          className="text-sm text-primary hover:underline font-medium"
        >
          ← {mode === "signup" ? "Back to Sign Up" : "Back to Sign In"}
        </button>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xs">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={loading || resendTimer > 0}
            className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendTimer > 0 ? `Try again in ${resendTimer}s` : "Resend"}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default OtpPage;
