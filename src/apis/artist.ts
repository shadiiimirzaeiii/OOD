import { stringify } from 'qs';
import { ApiManager } from '@/libs/http/axios.config';
import { Pagination } from '@/types/pagination';
import { PlaylistInfoResponse } from './playlist';
import { Artist } from './routes';
import { ApiData } from './utils';

export const getArtistList = async (params: Partial<GetArtistListParams>) => {
  const serializedParams = stringify(params);

  const artistList = await ApiManager<ApiData<GetAristListResponse>>(`${Artist}?${serializedParams}`);

  return artistList.data.data;
};

export const getArtistInfo = async (params: GetArtist) => {
  const artistInfo = await ApiManager<ApiData<ArtistInfo>>(`${Artist}/${params.id}`);
  return artistInfo.data.data;
};

// TODO: fix api data for create and update Data type
export const createArtist = async (params: ManageArtistFormInfo) => {
  return await ApiManager.post<ApiData<any>>(Artist, params);
};

export const updateArtist = async (params: UpdateArtist & ManageArtistFormInfo) => {
  const { id, ...rest } = params;
  return await ApiManager.patch<ApiData<ManageArtistFormInfo>>(`${Artist}/${id}`, {
    ...rest,
  });
};

export const getArtistPlaylist = async (params: GetArtistPlaylist) => {
  const { id, ...rest } = params;
  const serializedParams = stringify(rest);

  const artistPlaylist = await ApiManager<ApiData<GetAristPlaylistResponse>>(
    `${Artist}/${id}/playlist?${serializedParams}`
  );

  return artistPlaylist.data.data;
};

export type GetArtistPlaylist = {
  id: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type GetArtist = {
  id: string;
};

export type ArtistInfo = {
  daily_views: number;
  followers: number;
  genre: string;
  id: string;
  image: string;
  latinName: string;
  likes: number;
  name: string;
  playlists: [];
  recent_views: number;
  views: number;
};

export type UpdateArtist = {
  id: string;
};

export type ManageArtistFormInfo = {
  image: string | File;
  name: string;
  latinName: string;
  genre: string;
  id?: string;
};

export type GetAristListResponse = {
  items: ArtistListItemInfo[];
} & Pagination;

export type GetAristPlaylistResponse = {
  items: ArtistPlaylist[];
} & Pagination;

export type ArtistPlaylist = PlaylistInfoResponse & {
  artist?: {
    id: string;
    name: string;
  };
};

export type GetArtistListParams = {
  limit: number;
  page: number;
  search: string;
  sort: string;
};

export type ArtistListItemInfo = {
  createdAt: string;
  createdBy: string;
  genre: string;
  id: string;
  image: string;
  isPublished: boolean;
  latinName: string;
  name: string;
  updatedAt: string;
};

export type ArtistListPageSearchParams = {
  search?: string;
  sort?: string;
  page?: number;
};
