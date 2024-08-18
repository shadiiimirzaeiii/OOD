import { stringify } from 'querystring';
import { ApiData } from '@/apis/utils';
import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { ApiManager } from '@/libs/http/axios.config';
import { Pagination } from '@/types/pagination';
import { PlaylistSubCategory } from './playlist';
import { Request, RequestInfo, Response } from './routes';

export const getAllRequests = async (params: Partial<any> = {}, filters?: Array<string>, search?: string) => {
  const serializedParams = stringify(params);
  return await ApiManager.post<ApiData<GetAllRequestsResponse>>(`${Request}?${serializedParams}`, {
    filters,
    search,
  });
};

export const getRequest = async (id: string) => {
  const res = await ApiManager<ApiData<RequestListItem>>(`${RequestInfo}${id}`);

  return res.data;
};

export const responseToRequest = async (data: ResponseToRequest) =>
  await ApiManager.post<ApiData<string>>(Response, data);

export type GetAllRequestsParams = {
  page: number;
  limit: number;
};

export type GetAllRequestsResponse = {
  items: RequestListItem[];
} & Pagination;

export type RequestListItem = {
  id: string;
  createdBy: Author;
  type_code: 'ARTIST' | 'PLAYLIST';
  type: string;
  action_code: string;
  action: string;
  status: string;
  status_code: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy: Author | null;
  rejectionReason: string | null;
  isActive: boolean;
  info: {
    artist: {
      id: string;
      name: string;
      latinName: string;
      genre: string;
      image: string;
    };
    id: string;
    name: string;
    latinName: string;
    image: string;
    genre?: string;
    isPremium?: boolean;
    subCategory: PlaylistSubCategory;
    category: PlaylistSubCategory;
    tracks?: TrackItem[];
  };
  createdAt: string;
  updatedAt: string;
};

export type Author = {
  id: string;
  name: string;
  image: string;
};

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type RequestType = 'artist' | 'playlist' | 'pending' | 'approved' | 'rejected';

export type ResponseToRequest = {
  id: string;
  status: boolean;
  message?: string;
  draftType: 'ARTIST' | 'PLAYLIST';
};
