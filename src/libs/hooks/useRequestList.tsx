import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next-nprogress-bar';
import { useQuery } from '@tanstack/react-query';
import { getAllRequests, GetAllRequestsResponse } from '@/apis/request';

export const useRequestList = (initialData: GetAllRequestsResponse, searchParams?: any) => {
  const [currentPage, setCurrentPage] = useState(() => Number(searchParams?.page) || 1);
  const [useInitialData, setUseInitialData] = useState(true);
  const formMethods = useForm({
    defaultValues: {
      filters: [],
      sort: 'desc',
      search: undefined,
    },
  });

  useEffect(() => {
    setUseInitialData(false);
  }, []);

  const router = useRouter();

  //todo: add sort & filters & search
  const handleSearchParams = () => {
    const searchParams = new URLSearchParams();
    currentPage > 1 && searchParams.append('page', currentPage.toString());

    const generatedUrl = `/requests?${searchParams.toString()}`;

    router.push(generatedUrl, { scroll: false });
  };

  const { watch } = formMethods;
  const query = useQuery({
    queryKey: ['requests', 'list', watch('filters'), watch('sort'), watch('search'), currentPage],
    queryFn: async () => {
      const res = await getAllRequests(
        {
          limit: 5,
          page: currentPage,
          sort: watch('sort'),
        },
        watch('filters'),
        watch('search')
      );
      return res.data.data;
    },
    initialData: useInitialData ? initialData : undefined,
    onSuccess: () => {
      handleSearchParams();
    },
  });

  return {
    query,
    formMethods,
    currentPage,
    setCurrentPage,
  };
};

export const QUERY_REQUESTS = 'requests';

export const useRequests = () =>
  useQuery({
    queryKey: [QUERY_REQUESTS],
    queryFn: async () => {
      const res = await getAllRequests();
      return res.data.data;
    },
  });
