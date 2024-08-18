import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
  isServer = typeof window === 'undefined';

export const ApiManager = axios.create({
  baseURL,
  headers: {
    // 'Content-Type': 'application/json',
  },
  withCredentials: true,
});

ApiManager.defaults.withCredentials = true;
ApiManager.interceptors.request.use(async config => {
  if (isServer) {
    const { cookies } = await import('next/headers'),
      token = cookies().get('token')?.value;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-mode'] = cookies().get('mode')?.value;
      config.withCredentials = true;
    }
  } else {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const mode = document.cookie.replace(/(?:(?:^|.*;\s*)mode\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-mode'] = mode;
    }
  }

  return config;
});
