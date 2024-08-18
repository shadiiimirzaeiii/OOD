import { useMutation, useQuery } from '@tanstack/react-query';
import { getActivity } from '@/apis/activity';

export const QUERY_USER_ACTIVITY = 'user-activity';

export const useActivity = (authorId?: string) => {
  return useQuery({
    queryKey: [QUERY_USER_ACTIVITY],
    queryFn: async () => {
      return await getActivity(authorId);
    },
  });
};
