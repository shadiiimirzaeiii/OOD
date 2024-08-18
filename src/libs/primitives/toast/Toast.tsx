'use client';

import { Slide } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from './Toast.style';

const Toast = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={true}
      draggable={true}
      theme='colored'
      limit={3}
      transition={Slide}
      icon={true}
    />
  );
};

export default Toast;

export const ToastSuccess = (message: string) => {
  return toast.success(message, {
    // icon: <ToastSuccessSVgIcon />, icon should be added
  });
};

export const ToastError = (message: string) => {
  return toast.error(message, {
    // icon: <ToastErrorSVgIcon />, icon should be added
  });
};

export const ToastWarning = (message: string) => {
  return toast.warning(message, {
    // icon: <ToastWarnSVgIcon />, icon should be added
  });
};
