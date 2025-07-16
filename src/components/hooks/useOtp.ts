import { useMutation } from '@tanstack/react-query';
import { sendOtp, verifyOtp } from '../services/api';

export function useSendOtp() {
  return useMutation({
    mutationFn: () => sendOtp(),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (otp: string) => verifyOtp(otp),
  });
} 