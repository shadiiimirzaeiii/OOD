'use server';

import { cookies } from 'next/headers';
import { AuthResponse, otpVerification } from '@/apis/auth';

export const setModeCookie = async (mode: number) => {
  cookies().set('mode', mode.toString());

  return cookies().get('mode');
};

export const sendOtpVerification = async (data: { username: string; otp: string }) => {
  const res = await otpVerification(data);

  if (!res.data.success) {
    return false;
  }

  await setCredentials(res.data.data);
  return true;
};

export const setCredentials = async (data: AuthResponse) => {
  cookies().set('token', data.token, {
    maxAge: 7 * 60 * 60 * 24000,
  });
  cookies().set('role', data.role);
  cookies().set('mode', data.mode);
};
