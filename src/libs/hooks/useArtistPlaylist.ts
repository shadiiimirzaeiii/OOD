import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArtistListPageSearchParams, GetAristPlaylistResponse, getArtistPlaylist } from '@/apis/artist';
import { getSubCategoryPlaylists } from '@/apis/category';
import { ArtistListSortOptions } from '@/constants/artist-sort';

type Args = {
  initialData: GetAristPlaylistResponse;
  searchParams: ArtistListPageSearchParams;
  id: string;
};

const getSort = (sort?: string) => {
  if (!sort) return ArtistListSortOptions[0];

  const sortOption = ArtistListSortOptions.find(option => option.value === sort);

  return sortOption || ArtistListSortOptions[0];
};

export const useArtistPlaylist = (args: Args) => {
  const { searchParams, initialData, id } = args;
  const [currentPage, setCurrentPage] = useState(() => Number(searchParams?.page) || 1);
  const [search, setSearch] = useState(() => searchParams?.search || '');
  const [sort, setSort] = useState(() => getSort(searchParams.sort));
  const [useInitialData, setUseInitialData] = useState(true);

  useEffect(() => {
    setUseInitialData(false);
  }, []);

  const handleSearchParams = () => {
    const params = new URLSearchParams();
    sort.value !== ArtistListSortOptions[0].value && params.append('sort', sort.value);
    search && params.append('search', search.trim());
    currentPage > 1 && params.append('page', currentPage.toString());

    const generatedUrl = `${id}?${params.toString()}`;

    router.replace(generatedUrl, { scroll: false });
  };

  const router = useRouter();

  const query = useQuery({
    queryKey: [
      initialData.items.some(({ artist }) => artist?.id) ? 'subCategory_playlist' : 'artist_playList',
      search,
      currentPage,
      sort,
    ],
    queryFn: async () => {
      const payload = {
        id: id,
        page: currentPage,
        limit: 7,
        search: search.trim() || undefined,
        ...(sort.value && { sort: sort.value }),
      };
      const res = initialData.items.some(({ artist }) => artist?.id)
        ? await getSubCategoryPlaylists(payload)
        : await getArtistPlaylist(payload);

      return res;
    },
    initialData: useInitialData ? initialData : undefined,
    keepPreviousData: true,
    onSuccess: () => {
      handleSearchParams();
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
  };
};
