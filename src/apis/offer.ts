import { stringify } from 'qs';
import { ApiManager } from '@/libs/http/axios.config';
import { OfferCodeFromTypes } from '@/types/offers.types';
import { Pagination } from '@/types/pagination';
import { Offer } from './routes';
import { ApiData } from './utils';

export const getOfferList = async (params: OfferListParams) => {
  const serializedParams = stringify(params);

  const artistList = await ApiManager<ApiData<GetOfferListResponse>>(`${Offer}?${serializedParams}`);

  return artistList.data.data;
};

export const getOffer = async (id: string) => {
  const artistList = await ApiManager<ApiData<SingleOffer>>(`${Offer}/${id}`);

  return artistList.data.data;
};

export const createOffer = async (
  data: Omit<OfferCodeFromTypes, 'percent' | 'quantity'> & { percent: number; quantity: number }
) => {
  return await ApiManager.post<ApiData<string>>(`${Offer}`, data);
};

export const editOffer = async (
  data: Omit<OfferCodeFromTypes, 'percent' | 'quantity'> & { percent: number; quantity: number; id: string }
) => {
  const { id, ...rest } = data;
  return await ApiManager.patch<ApiData<string>>(`${Offer}/${id}`, rest);
};

export type OfferListParams = {
  page: number;
  limit: number;
};

export type OfferListItem = {
  id: string;
  name: string;
  code: string;
  percent: number;
  active: boolean;
  startDate: string;
  endDate: string;
  quantity: number;
};

export type GetOfferListResponse = {
  items: OfferListItem[];
} & Pagination;

export type OfferListProps = {
  initialData: GetOfferListResponse;
  searchParams: OfferListParams;
};

export type SingleOffer = OfferListItem & { remain: number; taken: number };
