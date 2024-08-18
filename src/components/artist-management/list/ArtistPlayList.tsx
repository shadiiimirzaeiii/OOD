'use client';

import { useMemo } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Box, Flex } from '@radix-ui/themes';
import styled from 'styled-components';
import Table from '@/components/shared/table/Table';
import { useArtistPlaylist } from '@/libs/hooks/useArtistPlaylist';
import { Pagination } from '@/libs/primitives/pagination/Pagination';
import { Breakpoints } from '@/theme/breakpoints';
import { getArtistPlayListColumns } from './ArtistPlayList.constant';
import ArtistPlayListHeader from './header/ArtistPlayListHeader';
import { ArtistPlayListProps } from './list.type';

const ArtistPlayList = (props: ArtistPlayListProps) => {
  const { searchParams, initialData, artistId, rowLinkNavigation } = props;

  const router = useRouter();

  const { currentPage, setCurrentPage, sort, setSort, search, setSearch, query } = useArtistPlaylist({
    initialData,
    searchParams,
    id: artistId as string,
  });

  const { data, isLoading } = query;

  const listColumns = useMemo(() => {
    return getArtistPlayListColumns();
  }, []);

  return (
    <MainBox
      direction={'column'}
      gap={'4'}
      py={'4'}
      pr={{ initial: '0', md: '4' }}
      pl={{ initial: '0', md: '8' }}
    >
      <ArtistPlayListHeader
        buttonLinkNavigation={`/playlist/create/${artistId}`}
        textButton='ساخت لیست پخش'
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <Table
        data={data ? data.items : []}
        columns={listColumns}
        onRowClick={({ id }) => router.push(`${rowLinkNavigation}/${id}`)}
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

export default ArtistPlayList;

const MainBox = styled(Flex)`
  border-radius: 16px;
  @media (min-width: ${Breakpoints.md}) {
    box-shadow: -2px 4px 16px -4px rgba(18, 43, 76, 0.2);
  }
`;
