import { stringify } from 'qs';
import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { ApiManager } from '@/libs/http/axios.config';
import { Pagination } from '@/types/pagination';
import { Track as TrackType } from '@/types/tracks';
import { Playlist, Track } from '../routes';
import { ApiData } from '../utils';

export const getPlaylistTracks = async (params: PlaylistTracksParams) => {
  const { id, ...rest } = params;
  const serializedParams = stringify(rest);

  const res = await ApiManager<ApiData<TrackItem[]>>(`${Playlist}/${id}/track?${serializedParams}`);

  return res.data.data;
};

export const getAllTracks = async (params: Omit<PlaylistTracksParams, 'id'>) => {
  const serializedParams = stringify(params);

  const res = await ApiManager<ApiData<PlaylistTracksResponse>>(`${Track}?${serializedParams}`);

  return res.data.data;
};

export const getTrack = async (id: string) => {
  const res = await ApiManager<ApiData<TrackType>>(`${Track}/${id}`);

  return res.data.data;
};

export const deleteTrack = async (ids: string[]) => {
  const res = await ApiManager.delete(`${Track}`, { data: { ids } });

  return res.data.data;
};

export const unmarkDuplicate = async (data: { ids: string[]; uploadId: string }) => {
  const res = await ApiManager.post(`${Track}`, { ids: data.ids, uploadId: data.uploadId });

  return res.data.data;
};

export const qualities = async () => {
  const res = await ApiManager.get<ApiData<Quality[]>>('track/quality/list');

  return res.data.data;
};

export const createQuality = async (data: Partial<Quality>) => {
  const res = await ApiManager.post<ApiData<Quality>>('track/quality', data);

  return res.data.data;
};

export const updateQuality = async (data: Partial<Quality>) => {
  const res = await ApiManager.patch<ApiData<Quality>>('track/quality', data);

  return res.data.data;
};

export type Quality = {
  id: string;
  name: string;
  isPremium: boolean;
  bitrate: string | null;
  format: string | null;
};

export type PlaylistTracksResponse = {
  items: TrackItem[];
} & Pagination;

export type PlaylistTracksParams = {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  id: string;
};
