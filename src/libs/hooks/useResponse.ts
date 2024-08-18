import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { responseToRequest, ResponseToRequest } from '@/apis/request';
import { ToastError, ToastSuccess } from '../primitives';

export const useResponse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: (data: ResponseToRequest) => {
      return responseToRequest(data);
    },
    onSuccess: async data => {
      ToastSuccess(data.data.data);
      await queryClient.invalidateQueries(['requests', 'list']);
      router.push('/requests');
    },
    onError: (error: any) => {
      if (error.response.status === 403) {
        ToastError('مجاز به دسترسی نمی باشید');
      } else {
        ToastError('مشکلی پیش آمده. مجحددا تلاش کنید');
      }
    },
  });

  return {
    mutate,
    isLoading,
    isSuccess,
  };
};
