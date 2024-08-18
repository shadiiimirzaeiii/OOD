import { ApiManager } from '@/libs/http/axios.config';
import { Auth, VerifyOTP } from './routes';
import { ApiData } from './utils';

export const mobileRegistration = async (params: { username: string }) => {
  const res = await ApiManager.post<ApiData<{ token: string; role: string }>>(Auth, params);

  return res;
};

export const otpVerification = async (params: { username: string; otp: string }) => {
  const res = await ApiManager.post<ApiData<AuthResponse>>(VerifyOTP, params);

  return res;
};

export type AuthResponse = { token: string; role: string; mode: string };
