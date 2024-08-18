'use client';

import { useMemo } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Box, Flex } from '@radix-ui/themes';
import { OfferListProps } from '@/apis/offer';
import { useOffers } from '@/libs/hooks/useOffers';
import { Pagination } from '@/libs/primitives/pagination/Pagination';
import Table from '../shared/table/Table';
import { getOfferListColumns } from './list.constant';

type Props = OfferListProps;

const OfferList = (props: Props) => {
  const { query, currentPage, setCurrentPage } = useOffers(props);
  const router = useRouter();

  const { data, isLoading } = query;

  const listColumns = useMemo(() => {
    return getOfferListColumns();
  }, []);

  return (
    <Flex direction={'column'} gap={'5'}>
      <Table
        data={data?.items ?? []}
        columns={listColumns}
        onRowClick={({ id }) => router.push(`/offer/info/${id}`)}
        rowStyles={{ cursor: 'pointer' }}
      />

      <Box mx={'auto'}>
        <Pagination
          isLoading={isLoading}
          current={currentPage}
          total={data ? data.pages.total : 0}
          onPageChange={p => {
            setCurrentPage(p);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </Box>
    </Flex>
  );
};

export default OfferList;
