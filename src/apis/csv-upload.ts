import { ApiManager } from '@/libs/http/axios.config';
import { Track } from '@/types/tracks';
import { ApiData } from './utils';

export const CSVUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const {
    data: { data },
  } = await ApiManager.post<ApiData<string>>('/csv/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const CSVUploadHistory = async (params: { type: 'all' | 'users' | 'me' }) =>
  (
    await ApiManager.get<ApiData<UploadHistory[]>>('/csv/history', {
      params,
    })
  ).data;

export const UploadHistoryDetail = async (id: string) =>
  (await ApiManager.get<ApiData<UploadHistoryDetail>>(`/csv/history/${id}`)).data;

export const DeleteUpload = async (id: string) =>
  (await ApiManager.delete<ApiData<UploadHistoryDetail>>(`/csv/history/${id}`)).data;

export type UploadStatus = 'COMPLETED' | 'FAILED' | 'PENDING' | 'PROCESSING';

export type UploadHistory = {
  id: string;
  authorId: string;
  fileName: string;
  fileTotalRecords: number;
  failedRecords: number;
  successRecords: number;
  duplicateRecords: number;
  status: UploadStatus;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    username: string;
  };
};

export type UploadHistoryDetail = {
  id: string;
  authorId: string;
  fileName: string;
  fileTotalRecords: number;
  failedRecords: number;
  duplicateRecords: number;
  successRecords: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  modeId: number;
  author: {
    id: string;
    name: string;
  };
  tracks: Array<Track> | null;
};
