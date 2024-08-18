import { ROLE } from '@/constants/routes';
import { getCookie } from '../methods/get-cookie';

export const useRole = (): ROLE => {
  const role = getCookie('role');

  return role;
};
