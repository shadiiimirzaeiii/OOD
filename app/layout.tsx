import { Suspense } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Provider } from 'jotai';
import { Toast } from '@/libs/primitives';
import ProgressProvider from '@/libs/providers/ProgressProrvider';
import { ReactQueryProvider } from '@/libs/providers/ReactQueryProvider';
import StyledComponentsRegistry from '@/libs/providers/registry';
import { dana } from '@/theme/font-config';
import './globals.css';
import './theme.config.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={dana.variable} lang='fa' dir='rtl'>
      <body>
        <ReactQueryProvider>
          <Provider>
            <StyledComponentsRegistry>
              <Theme accentColor='amber' grayColor='gray' radius='large' scaling='100%'>
                <Suspense>
                  <ProgressProvider>{children}</ProgressProvider>
                </Suspense>
              </Theme>
              <Toast />
            </StyledComponentsRegistry>
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'عود',
  description: 'پنل مدیریت عود',
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'icon', url: '/android-chrome-192x192.png' },
    { rel: 'icon', url: '/favicon-16x16.png' },
    { rel: 'icon', url: '/favicon-32x32.png' },
  ],
  robots: 'noindex, nofollow',
};
