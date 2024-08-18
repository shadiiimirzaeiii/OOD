import type { Metadata } from 'next';
import Header from '@/layouts/root-layout/header/Header';
import { StyledContainer } from '@/layouts/root-layout/layout.styled';
import SideBar from '@/layouts/root-layout/side-bar/SideBar';

export const metadata: Metadata = {
  title: 'پنل مدیریت محتوا عود',
  description: 'Generated by create next app',
};

export default function ModeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside style={{ position: 'fixed', height: '100vh', zIndex: '100' }}>
        <SideBar />
      </aside>
      <header style={{ marginRight: '210px', position: 'sticky', top: '0', zIndex: 100 }}>
        <Header />
      </header>
      <main style={{ marginRight: '210px', padding: '24px 32px' }}>
        <StyledContainer display={'block'} size={'4'} style={{ marginInline: 'auto' }}>
          {children}
        </StyledContainer>
      </main>
    </>
  );
}