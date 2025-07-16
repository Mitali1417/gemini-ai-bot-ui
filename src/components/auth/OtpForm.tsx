import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useSendOtp, useVerifyOtp } from '../hooks/useOtp';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type OtpFormType = z.infer<typeof otpSchema>;

interface OtpFormProps {
  onSubmit: (otp: string) => void;
  onResend: () => void;
  loading: boolean;
  resendTimer: number;
}

const OtpForm: React.FC<OtpFormProps> = ({ onSubmit, onResend, loading, resendTimer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormType>({ resolver: zodResolver(otpSchema) });

  const verifyOtpMutation = useVerifyOtp();
  const sendOtpMutation = useSendOtp();

  const handleFormSubmit = (data: OtpFormType) => {
    verifyOtpMutation.mutate(data.otp, {
      onSuccess: () => onSubmit(data.otp),
    });
  };

  const handleResend = () => {
    sendOtpMutation.mutate(undefined, {
      onSuccess: () => onResend(),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label className="block mb-1 font-medium">Enter OTP</Label>
        <Input
          {...register('otp')}
          type="text"
          className="w-full"
          disabled={loading || verifyOtpMutation.status === 'pending'}
          placeholder="6-digit code"
          maxLength={6}
        />
        {errors.otp && (
          <span className="text-red-500 text-xs">{errors.otp.message}</span>
        )}
        <div className="text-xs text-muted-foreground mt-1">Use OTP <span className="font-mono">123456</span> for demo.</div>
      </div>
      <Button type="submit" className="w-full" disabled={loading || verifyOtpMutation.status === 'pending'}>
        {verifyOtpMutation.status === 'pending' ? 'Verifying...' : 'Verify OTP'}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full mt-2"
        onClick={handleResend}
        disabled={loading || resendTimer > 0 || sendOtpMutation.status === 'pending'}
      >
        {sendOtpMutation.status === 'pending'
          ? 'Resending...'
          : resendTimer > 0
          ? `Resend OTP in ${resendTimer}s`
          : 'Resend OTP'}
      </Button>
      {verifyOtpMutation.isError && (
        <div className="text-red-500 text-xs mt-2">Failed to verify OTP.</div>
      )}
      {sendOtpMutation.isError && (
        <div className="text-red-500 text-xs mt-2">Failed to resend OTP.</div>
      )}
    </form>
  );
};

export default OtpForm;