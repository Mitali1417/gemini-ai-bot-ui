import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/auth/SignInForm';
import AuthLayout from "@/components/shared/AuthLayout";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      </div>
      <div className="w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <SignInForm
          onSubmit={(phone, country) => {
            navigate('/otp', { state: { phone, country, mode: 'signup' } });
          }}
        />
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage; 