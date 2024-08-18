'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height='5px' color='var(--tomato-9)' options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default ProgressProvider;
