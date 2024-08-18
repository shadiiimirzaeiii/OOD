import { UploadStatus } from './csv-upload';

export type ApiData<T> = {
  success: boolean;
  data: T;
};

export const mapUploadStatus = (status: UploadStatus) => {
  switch (status) {
    case 'COMPLETED':
      return 'انجام شده';
    case 'FAILED':
      return 'ناموفق';
    case 'PENDING':
      return 'در انتظار';
    case 'PROCESSING':
      return 'در حال پردازش';
    default:
      return status;
  }
};
