'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { Button, Flex, Text, TextField } from '@radix-ui/themes';
import { mobileRegistration } from '@/apis/auth';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { typoVariant } from '@/theme/typo-variants';
import { sendOtpVerification } from '../../../app/actions';
import ResendOtpButton from './ResendOtpButton';

interface FormValues {
  username: string;
  otp: string;
}

const LoginForm = () => {
  const [state, setState] = useState<'PHONE_NUMBER' | 'OTP'>('PHONE_NUMBER');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      otp: '',
    },
  });

  const handlePhone = async () => {
    setLoading(true);
    const res = await mobileRegistration({ username: getValues('username') });
    setLoading(false);
    if (res.data.success) {
      setState('OTP');
    } else {
      setState('PHONE_NUMBER');
      ToastError('خطایی رخ داده است. مجددا تلاش کنید');
    }
  };

  const handleOtp = async (val: FormValues) => {
    const status = await sendOtpVerification(val);
    if (status) {
      ToastSuccess('خوش آمدید');
      window.location.href = '/';
    } else {
      ToastError('مشکلی پیش آمده. مجحددا تلاش کنید');
    }

    reset();
  };

  return (
    <>
      {state === 'OTP' ? (
        <form onSubmit={handleSubmit(handleOtp)} style={{ width: '100%' }}>
          <Flex direction={'column'} gap={'7'} width={'100%'}>
            <Text {...typoVariant.description1}>{'کد ارسال شده به شماره تماستان را وارد کنید.'}</Text>
            <Flex direction={'column'} gap={'1'} style={{ height: '80px' }}>
              <Text mr={'4'} as='label' {...typoVariant.body2}>
                {'کد تایید'}
              </Text>

              <TextField.Input
                {...register('otp', {
                  required: { message: 'فیلد اجباری', value: true },
                })}
                radius='small'
                size={'3'}
                placeholder='مثال : 1234'
                style={{ fontSize: '12px' }}
              />

              <Text as='span' color='amber' {...typoVariant.description2} mr={'3'}>
                {errors.otp?.message as string}
              </Text>
            </Flex>
            <Flex direction={'column'} gap={'6'} style={{ width: '240px' }} mx={'auto'}>
              <ResendOtpButton />
              <Flex gap={'7'}>
                <Button
                  disabled={!isValid}
                  type='submit'
                  size={'3'}
                  style={{ fontSize: '12px', width: '100px', height: '40px' }}
                >
                  ورود
                </Button>
                <Button
                  size={'3'}
                  variant='outline'
                  style={{ fontSize: '12px', width: '100px', height: '40px' }}
                  onClick={() => setState('PHONE_NUMBER')}
                >
                  بازگشت
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handlePhone)} style={{ width: '100%' }}>
          <Flex direction={'column'} gap={'7'} width={'100%'}>
            <Text {...typoVariant.description1}>
              {'برای ورود به سامانه ابتدا شماره تماس خود را وارد کنید.'}
            </Text>
            <Flex direction={'column'} gap={'1'} style={{ height: '80px' }}>
              <Text mr={'4'} as='label' {...typoVariant.body2}>
                {'شماره تماس'}
              </Text>

              <TextField.Input
                {...register('username', {
                  required: { message: 'فیلد اجباری', value: true },
                  pattern: {
                    message: 'فرمت موبایل درست نیست',
                    value: /^09\d{9}$/,
                  },
                })}
                radius='small'
                size={'3'}
                placeholder='مثال : 0912000000'
                style={{ fontSize: '12px' }}
              />

              <Text as='span' color='amber' {...typoVariant.description2} mr={'3'}>
                {errors.username?.message as string}
              </Text>
            </Flex>

            <Flex width={'100%'} justify={'center'}>
              <Button
                disabled={loading}
                type='submit'
                size={'3'}
                style={{ fontSize: '12px', height: '40px', width: '127px' }}
              >
                {loading ? <Loading type='spin' color='#ffc53d' width={20} height={20} /> : 'دریافت کد تایید'}
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </>
  );
};

export default LoginForm;
