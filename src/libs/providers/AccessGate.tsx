'use client';

import { ROLE } from '@/constants/routes';

const AccessGate = ({ confirmedRoles, children }: { children: React.ReactNode; confirmedRoles: ROLE[] }) => {
  if (typeof window !== 'undefined') {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts?.pop()?.split(';').shift();
    };

    const role = getCookie('role') as ROLE;

    const hasAccess = confirmedRoles.includes(role);

    if (!hasAccess) return null;

    return <>{children}</>;
  }

  return null;
}; 

export default AccessGate;
