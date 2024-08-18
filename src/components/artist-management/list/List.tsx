'use client';

import { useMemo } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Box, Flex } from '@radix-ui/themes';
import { styled } from 'styled-components';
import Table from '@/components/shared/table/Table';
import { useArtistList } from '@/libs/hooks/useArtistList';
import { Pagination } from '@/libs/primitives/pagination/Pagination';
import { Breakpoints } from '@/theme/breakpoints';
import Header from './header/Header';
import { getArtistListColumns } from './list.constant';
import { ArtistListProps } from './list.type';

const List = (props: ArtistListProps) => {
  const { searchParams, initialData } = props;

  const router = useRouter();

  const { currentPage, setCurrentPage, sort, setSort, search, setSearch, query } = useArtistList({
    initialData,
    searchParams,
  });

  const { data, isLoading } = query;

  const listColumns = useMemo(() => {
    return getArtistListColumns();
  }, []);

  return (
    <MainBox
      direction={'column'}
      gap={'4'}
      py={'4'}
      pr={{ initial: '0', md: '4' }}
      pl={{ initial: '0', md: '8' }}
    >
      <Header search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      <Table
        data={data ? data.items : []}
        columns={listColumns}
        onRowClick={({ id }) => router.push(`/artist/info/${id}`)}
        cellStyles={{
          cursor: 'pointer',
        }}
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
    </MainBox>
  );
};

export default List;

const MainBox = styled(Flex)`
  border-radius: 16px;
  @media (min-width: ${Breakpoints.md}) {
    box-shadow: -2px 4px 16px -4px rgba(18, 43, 76, 0.2);
  }
`;
