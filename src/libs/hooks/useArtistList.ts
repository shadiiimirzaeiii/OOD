import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArtistListPageSearchParams, GetAristListResponse, getArtistList } from '@/apis/artist';
import { ArtistListSortOptions } from '@/constants/artist-sort';

type Args = {
  initialData: GetAristListResponse;
  searchParams: ArtistListPageSearchParams;
};

const getSort = (sort?: string) => {
  if (!sort) return ArtistListSortOptions[0];

  const sortOption = ArtistListSortOptions.find(option => option.value === sort);

  return sortOption || ArtistListSortOptions[0];
};

export const useArtistList = (args: Args) => {
  const { searchParams, initialData } = args;
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

    const generatedUrl = `artist?${params.toString()}`;

    router.push(generatedUrl, { scroll: false });
  };

  const router = useRouter();

  const query = useQuery({
    queryKey: ['artist_list', search, currentPage, sort],
    queryFn: async () => {
      const res = await getArtistList({
        page: currentPage,
        limit: 7,
        search: search.trim() || undefined,
        ...(sort.value && { sort: sort.value }),
      });

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
