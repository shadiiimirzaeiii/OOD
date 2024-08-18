import { ApiManager } from '@/libs/http/axios.config';
import { UploadFile } from '../routes';
import { ApiData } from '../utils';

export type Path =
  | 'category'
  | 'sub-category'
  | 'artist'
  | 'authors'
  | 'playlist'
  | 'album'
  | 'track'
  | 'common';

export const uploadImage = async (path: Path, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const {
    data: { data },
  } = await ApiManager.post<ApiData<string>>(`${UploadFile}?path=${path}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
