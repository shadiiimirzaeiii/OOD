'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex } from '@radix-ui/themes';
import { PlaylistTracksParams, PlaylistTracksResponse } from '@/apis/shared/track';
import Header from '@/components/artist-management/search-track/Header';
import { useAllTracks } from '@/libs/hooks/useAllTracks';
import { Pagination } from '@/libs/primitives/pagination/Pagination';
import Table from '../table/Table';
import { getTrackListColumns } from './Columns';

type Props = {
  initialData: PlaylistTracksResponse;
  searchParams: Partial<PlaylistTracksParams>;
};

const TrackTable = (props: Props) => {
  const { query, currentPage, setCurrentPage, ...headerProps } = useAllTracks(props);
  const { data, isLoading } = query;
  const router = useRouter();

  const listColumns = useMemo(() => {
    return getTrackListColumns();
  }, []);

  return (
    <Flex direction={'column'} gap={'5'}>
      <Header {...headerProps} />
      <Table
        onRowClick={({ id }) => router.push(`/tracks/${id}`)}
        data={data?.items || []}
        columns={listColumns}
        cellStyles={{
          cursor: 'pointer',
        }}
        isEvenRowsColored
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

export default TrackTable;
