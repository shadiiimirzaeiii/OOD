import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { ApiManager } from '@/libs/http/axios.config';
import { Artist, Playlist } from './routes';
import { ApiData } from './utils';

export const getPlaylistInfo = async (params: PlaylistInfoParams) => {
  const res = await ApiManager<ApiData<PlaylistInfoResponse>>(`${Playlist}/${params.id}`);
  return res.data.data;
};

export const createPlaylist = async (params: PlaylistActionParams) => {
  const { id, ...rest } = params;
  const res = await ApiManager.post<ApiData<string>>(`${Artist}/${id}/playlist`, rest);
  return res.data.data;
};

export const editPlaylist = async (params: PlaylistActionParams) => {
  const { id, ...rest } = params;
  const res = await ApiManager.patch<ApiData<string>>(`${Playlist}/${id}`, rest);
  return res.data.data;
};

export const deletePlaylist = async (id: string) => {
  const res = await ApiManager.delete<ApiData<string>>(`${Playlist}/${id}`);
  return res.data.data;
};

export type PlaylistInfoResponse = {
  id: string;
  name: string;
  latinName: string;
  subCategory: PlaylistSubCategory;
  category: PlaylistSubCategory;
  image: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  view: number;
  view_recent: number;
  view_daily: number;
  downloads: number;
  followers: number;
  likes: number;
};

export type PlaylistActionParams = Omit<PlaylistForm, 'category' | 'subCategory' | 'tracks'> & {
  subCategory: string;
  tracks: string[];
  id: string;
};

export type PlaylistInfoParams = {
  id: string;
};

export type PlaylistForm = {
  name: string;
  latinName: string;
  subCategory: {
    label: string;
    value: string;
  };
  category: {
    label: string;
    value: string;
  };
  image: string | File;
  isPremium: boolean;
  tracks: TrackItem[];
};

export type PlaylistSubCategory = {
  id: string;
  name: string;
  latinName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type ArtistPlayListItemInfo = {
  id: string;
  name: string;
  latinName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  view: number;
  view_recent: number;
  view_daily: number;
  downloads: number;
  followers: number;
  likes: number;
};
