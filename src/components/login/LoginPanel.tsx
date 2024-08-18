'use client';

import { Flex, Heading } from '@radix-ui/themes';
import { LoginLogo } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import LoginForm from './LoginForm';

const LoginPanel = () => {
  return (
    <section
      style={{
        borderRadius: '32px 0 0 32px',
        padding: '40px 80px',
        boxShadow: '20px 0px 40px 16px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Flex direction={'column'} align={'center'} width={'100%'}>
        <Flex direction={'column'} gap={'4'} width={'100%'} align={'center'} pb={'7'} mb={'7'}>
          <LoginLogo />
          <Heading {...typoVariant.h1}>پنل مدیریت عود</Heading>
        </Flex>
        <LoginForm />
      </Flex>
    </section>
  );
};

export default LoginPanel;
