import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getOfferList, GetOfferListResponse, OfferListParams } from '@/apis/offer';

type Args = {
  initialData: GetOfferListResponse;
  searchParams: OfferListParams;
};

export const useOffers = (args: Args) => {
  const { searchParams, initialData } = args;
  const [currentPage, setCurrentPage] = useState(() => Number(searchParams?.page) || 1);
  const [useInitialData, setUseInitialData] = useState(true);

  useEffect(() => {
    setUseInitialData(false);
  }, []);

  const handleSearchParams = () => {
    const params = new URLSearchParams();
    currentPage > 1 && params.append('page', currentPage.toString());

    const generatedUrl = `offer?${params.toString()}`;

    router.push(generatedUrl, { scroll: false });
  };

  const router = useRouter();

  const query = useQuery({
    queryKey: ['offer_list', currentPage],
    queryFn: async () => {
      const res = await getOfferList({
        page: currentPage,
        limit: 10,
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
  };
};
