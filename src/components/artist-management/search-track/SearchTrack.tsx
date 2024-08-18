import { useMemo, useState } from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllTracks } from '@/apis/shared/track';
import Table from '@/components/shared/table/Table';
import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { ArtistListSortOptions } from '@/constants/artist-sort';
import { typoVariant } from '@/theme/typo-variants';
import { getTrackColumns } from './Columns';
import Header from './Header';

type Props = {
  selectedTracks: TrackItem[];
  dismiss: () => void;
  onSave: (tracks: TrackItem[]) => void;
};

export default function SearchTrack({ selectedTracks, dismiss, onSave }: Props) {
  const rowSelectionState = useState<TrackItem[]>(selectedTracks);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(ArtistListSortOptions[0]);

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ['track_table', search, sort],
    queryFn: async ({ pageParam = 1 }) => {
      return await getAllTracks({
        limit: 10,
        page: pageParam,
        ...(search && { search: search.trim() }),
        ...(sort.value && { sort: sort.value }),
      });
    },
    getNextPageParam: lastPage => {
      if (lastPage.pages.current >= lastPage.pages.total) {
        return undefined;
      }
      return +lastPage.pages.current + 1;
    },
  });

  const listColumns = useMemo(() => {
    return getTrackColumns(rowSelectionState);
  }, [rowSelectionState]);

  return (
    <Flex direction={'column'} gap={'5'} style={{ height: 452 }}>
      {isLoading ? (
        <text {...typoVariant.body2} style={{ margin: 'auto' }}>
          در حال بارگزاری...
        </text>
      ) : (
        <>
          <Header {...{ search, setSearch, sort, setSort }} />
          <Table
            data={data?.pages.flatMap(e => e.items) || []}
            columns={listColumns}
            cellStyles={{
              cursor: 'pointer',
            }}
            rowStyles={{ height: 48 }}
            isEvenRowsColored
            onReachLastItem={fetchNextPage}
            isLastPage={!hasNextPage}
          />
          <Flex position={'relative'}>
            <Button
              size={'3'}
              color={'sky'}
              onClick={() => {
                onSave(rowSelectionState[0]);
                dismiss();
              }}
            >
              <Text {...typoVariant.body2}>ثبت و ادامه</Text>
            </Button>
            <Button onClick={dismiss} size={'3'} variant='outline' mr={'5'}>
              <Text {...typoVariant.body2}>انصراف و بازگشت</Text>
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}
