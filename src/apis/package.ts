import { PackageForm } from '@/components/package/package-list/package-list.type';
import { ApiManager } from '@/libs/http/axios.config';
import { PackageItem } from '@/types/package';
import { Package } from './routes';
import { ApiData } from './utils';

export const getAllPackages = async () => {
  const res = await ApiManager<ApiData<PackageItem[]>>(`${Package}`);
  return res.data.data;
};

export const createPackage = async (data: PackageForm) => {
  return await ApiManager.post<ApiData<PackageItem>>(`${Package}`, data);
};

export const updatePackage = async (data: PackageForm, id: string) => {
  return await ApiManager.patch<ApiData<PackageItem>>(`${Package}/${id}`, data);
};

export const deletePackage = async (id: string) => {
  return await ApiManager.delete<ApiData<PackageItem>>(`${Package}/${id}`);
};
