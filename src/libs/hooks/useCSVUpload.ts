import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CSVUpload, CSVUploadHistory, DeleteUpload, UploadHistoryDetail } from '@/apis/csv-upload';
import { ToastError, ToastSuccess } from '../primitives';

export const QUERY_UPLOAD_HISTORY_LIST = 'upload-history-list';
export const QUERY_HISTORY_DETAIL = 'upload-history-detail';

export const useCSVUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ csv }: { csv: File }) => {
      return await CSVUpload(csv);
    },
    onError: e => ToastError((e as any).response.data.message),
    onSuccess: () => {
      ToastSuccess('فایل با موفقیت آپلود شد');
      queryClient.invalidateQueries([QUERY_UPLOAD_HISTORY_LIST]);
    },
  });
};

export const useCSVUploadHistory = (params: { type: 'all' | 'users' | 'me' }) =>
  useQuery({
    queryKey: [QUERY_UPLOAD_HISTORY_LIST, params.type],
    queryFn: async () => {
      return (await CSVUploadHistory(params)).data;
    },
  });

export const useUploadHistoryDetail = (id: string) =>
  useQuery({
    queryKey: [QUERY_HISTORY_DETAIL],
    queryFn: async () => {
      return (await UploadHistoryDetail(id)).data;
    },
  });

export const useDeleteUploadRecord = () =>
  useMutation({ mutationFn: ({ id }: { id: string }) => DeleteUpload(id) });
