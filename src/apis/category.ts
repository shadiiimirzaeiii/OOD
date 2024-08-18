import { stringify } from 'qs';
import { ApiManager } from '@/libs/http/axios.config';
import {
  CategoriesForm,
  CategoriesListByMode,
  SubCategoriesListResponse,
  SubCategoriesParams,
  SubCategoryPlaylistsResponse,
} from '@/types/categories';
import { Categories } from './routes';
import { ApiData } from './utils';

export const getCategories = async () => {
  const res = await ApiManager<ApiData<CategoriesListByMode[]>>(Categories);
  return res.data.data;
};

export const getSubCategories = async (params: SubCategoriesParams) => {
  const serializedParams = stringify(params);

  const res = await ApiManager<ApiData<SubCategoriesListResponse>>(`${Categories}/sub?${serializedParams}`);
  return res.data.data;
};

export const getSubCategoryPlaylists = async (
  params: Omit<SubCategoriesParams, 'category'> & { id: string }
) => {
  const { id, ...rest } = params;
  const serializedParams = stringify(rest);

  const res = await ApiManager<ApiData<SubCategoryPlaylistsResponse>>(
    `${Categories}/sub/${id}/playlist?${serializedParams}`
  );
  return res.data.data;
};

export const createCategory = async (data: Omit<CategoriesForm, 'image'> & { image: string }) => {
  return await ApiManager.post<ApiData<CategoriesListByMode>>(Categories, data);
};

export const editCategory = async (data: Omit<CategoriesForm, 'image'> & { image: string; id: string }) => {
  const { id, ...rest } = data;
  return await ApiManager.patch<ApiData<CategoriesListByMode>>(`${Categories}/${id}`, rest);
};

export const deleteCategory = async (id: string) => {
  return await ApiManager.delete<ApiData<CategoriesListByMode>>(`${Categories}/${id}`);
};

export const createSubCategory = async (
  data: Omit<CategoriesForm, 'image'> & { image: string; id: string }
) => {
  const { id, ...rest } = data;
  return await ApiManager.post<ApiData<CategoriesListByMode>>(`${Categories}/${id}/sub`, rest);
};

export const editSubCategory = async (
  data: Omit<CategoriesForm, 'image'> & { image: string; id: string }
) => {
  const { id, ...rest } = data;
  return await ApiManager.patch<ApiData<CategoriesListByMode>>(`${Categories}/sub/${id}`, rest);
};

export const deleteSubCategory = async (id: string) => {
  return await ApiManager.delete<ApiData<CategoriesListByMode>>(`${Categories}/sub/${id}`);
};
