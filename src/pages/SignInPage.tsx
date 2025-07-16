import React from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/auth/SignInForm";
import { Card, CardContent } from "@/components/ui/card";
import AuthLayout from "@/components/shared/AuthLayout";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light mb-2">Sign in to Gemini</h1>
        <p>Continue to your AI assistant</p>
      </div>
      <Card>
        <CardContent>
          <SignInForm
            onSubmit={(phone, country) => {
              navigate("/otp", { state: { phone, country, mode: "signin" } });
            }}
          />
        </CardContent>
      </Card>
      <div className="mt-8 text-center">
        <p className="text-xs">
          By signing in, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
