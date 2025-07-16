import { useMutation } from '@tanstack/react-query';
import { sendOtp, verifyOtp } from '../services/api';

export function useSendOtp() {
  return useMutation({
    mutationFn: ({ phone, country }: { phone: string; country: string }) => sendOtp(phone, country),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (otp: string) => verifyOtp(otp),
  });
} 