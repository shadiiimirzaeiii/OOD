import localFont from 'next/font/local';

export const dana = localFont({
  src: [
    {
      path: '../../public/fonts/woff2/DanaFaNum-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/woff2/DanaFaNum-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/woff2/DanaFaNum-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--dana-font',
});
