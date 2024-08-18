'use client';

import { useMemo } from 'react';
import { Flex } from '@radix-ui/themes';
import Table from '@/components/shared/table/Table';
import { getTrackListColumns } from '@/components/shared/track-table/Columns';
import { TrackItem } from '@/components/shared/track-table/track-table.type';

type Props = {
  data: TrackItem[];
};

const TrackSection = ({ data }: Props) => {
  const listColumns = useMemo(() => {
    return getTrackListColumns();
  }, []);

  return (
    <Flex>
      <Table
        data={data}
        columns={listColumns}
        cellStyles={{
          cursor: 'pointer',
        }}
        isEvenRowsColored
      />
    </Flex>
  );
};

export default TrackSection;
