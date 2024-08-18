import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlaylistTracks, PlaylistTracksParams } from '@/apis/shared/track';
import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { ArtistListSortOptions } from '@/constants/artist-sort';

type Args = {
  initialData: TrackItem[] | undefined;
  searchParams: Partial<PlaylistTracksParams>;
};

const getSort = (sort?: string) => {
  if (!sort) return ArtistListSortOptions[0];

  const sortOption = ArtistListSortOptions.find(option => option.value === sort);

  return sortOption || ArtistListSortOptions[0];
};

export const useTrackList = (args: Args) => {
  const { searchParams, initialData } = args;
  const [currentPage, setCurrentPage] = useState(() => Number(searchParams?.page) || 1);
  const [search, setSearch] = useState(() => searchParams?.search || '');
  const [sort, setSort] = useState(() => getSort(searchParams?.sort));

  const [currentTracks, setCurrentTracks] = useState(() => initialData || []);

  const query = useQuery({
    queryKey: ['tracks', 'list'],
    queryFn: async ({ pageParam = 1 }) => {
      return await getPlaylistTracks({
        limit: 10000,
        page: pageParam,
        id: searchParams.id!,
      });
    },
    initialData,
    enabled: !!initialData?.length,
    onSuccess: data => {
      setCurrentTracks(data!);
    },
  });

  return {
    query,
    currentPage,
    setCurrentPage,
    sort,
    setSort,
    search,
    setSearch,
    currentTracks,
    setCurrentTracks,
  };
};
