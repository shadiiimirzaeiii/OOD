import React, { useEffect, useState } from 'react';
import { Button, Text } from '@radix-ui/themes';

const otpLifeTime = 120;

const ResendOtpButton = () => {
  const [otpCounter, setOtpCounter] = useState<number>(otpLifeTime);

  useEffect(() => {
    if (otpCounter === 0) return;
    const interval = setInterval(() => {
      setOtpCounter(c => c - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCounter, setOtpCounter]);

  const resendOtp = () => {
    setOtpCounter(otpLifeTime);
  };

  return (
    <Button
      size={'3'}
      color='gray'
      style={{ fontSize: '12px' }}
      disabled={otpCounter > 0}
      onClick={resendOtp}
    >
      <Text as='span'>ارسال مجدد</Text>
      {otpCounter > 0 && <Text as='span'>{`${Math.floor(otpCounter / 60)}:${otpCounter % 60}`}</Text>}
    </Button>
  );
};

export default ResendOtpButton;
