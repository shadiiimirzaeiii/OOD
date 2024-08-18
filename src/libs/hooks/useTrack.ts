import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuality,
  deleteTrack,
  getTrack,
  qualities,
  unmarkDuplicate,
  updateQuality,
} from '@/apis/shared/track';
import { Track } from '@/types/tracks';

export const QUERY_TRACK = 'track_info';
export const QUERY_QUALITY_LIST = 'quality-list';

export const useTrack = (id: string) =>
  useQuery({
    queryKey: [QUERY_TRACK, id],
    queryFn: async () => {
      const res = await getTrack(id);
      ['season', 'date', 'channel', 'episode', 'originalTrack'].forEach(
        item => delete res[item as keyof Track]
      );
      return res;
    },
  });

export const useDeleteTrack = () =>
  useMutation({
    mutationFn: deleteTrack,
  });

export const useUnmarkTrack = () => useMutation({ mutationFn: unmarkDuplicate });

export const useQualityList = () => useQuery({ queryKey: [QUERY_QUALITY_LIST], queryFn: qualities });
export const useUpdateQuality = () => useMutation({ mutationFn: updateQuality });
export const useCreateQuality = () => useMutation({ mutationFn: createQuality });
