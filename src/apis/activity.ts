import { AuthorActionEnum } from '@/constants/activity';
import { ApiManager } from '@/libs/http/axios.config';
import { ApiData } from './utils';

export const getActivity = async (authorId?: string) => {
  const activities = await ApiManager.post<ApiData<Activity[]>>('activity', { authorId });
  return activities.data.data;
};

export type Activity = {
  id: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  action: AuthorActionEnum;
  name: string;
  image: string;
  type: 'upload' | 'playlist' | 'artist' | 'artistDraft' | 'playlistDraft';
  createdAt: string;
};
