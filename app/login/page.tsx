import LoginPanel from '@/components/login/LoginPanel';
import { LoginSvg } from '@/public/icon';

const LoginPage = () => {
  return (
    <main
      style={{
        display: 'flex',
        gap: '112px',
        backgroundColor: '#FCFCFC',
        height: '100vh',
      }}
    >
      <LoginPanel />
      <div style={{ alignSelf: 'center' }}>
        <LoginSvg />
      </div>
    </main>
  );
};

export default LoginPage;
