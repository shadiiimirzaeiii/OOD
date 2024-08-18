'use client';

import { useSortable } from '@dnd-kit/sortable';
import { Button, Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns-jalali/format';
import { typoVariant } from '@/theme/typo-variants';
import { TrackItem } from './track-table.type';

const columnHelper = createColumnHelper<TrackItem>();

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners, isDragging } = useSortable({
    id: rowId,
  });
  return (
    <Button
      type='button'
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      size={'1'}
      variant='ghost'
      {...attributes}
      {...listeners}
    >
      🟰
    </Button>
  );
};

export const getTrackListColumns = () => [
  columnHelper.accessor('id', {
    id: 'drag-handle',
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        -
      </Text>
    ),
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
    meta: {
      maxWidth: 40,
    },
  }),
  columnHelper.accessor('title', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        نام اثر
      </Text>
    ),
    cell: ({ row: { original } }) => (
      <Text {...typoVariant.description2} color={'gray'}>
        {original.title}
      </Text>
    ),
    meta: {
      maxWidth: 227,
    },
  }),
  columnHelper.accessor('isPremium', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        نوع اثر
      </Text>
    ),
    cell: info => (
      <Text {...typoVariant.description2} style={{ color: info.getValue() ? '#3451B2' : '#299764' }}>
        {info.getValue() ? 'اشتراکی' : 'رایگان'}
      </Text>
    ),
    meta: {
      maxWidth: 227,
    },
  }),
  columnHelper.accessor('duration', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        مدت زمان اثر
      </Text>
    ),

    cell: ({ row: { original } }) => (
      <Text {...typoVariant.description2} color={'gray'}>
        {Math.floor(original.duration / 60)} دقیقه و{' '}
        {original.duration - Math.floor(original.duration / 60) * 60} ثانیه
      </Text>
    ),
    meta: {
      maxWidth: 227,
    },
  }),
  columnHelper.accessor('createdAt', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        تاریخ ارائه
      </Text>
    ),
    cell: info => (
      <Text {...typoVariant.description2} color={'gray'}>
        {format(new Date(info.getValue()), 'd MMMM yyyy')}
      </Text>
    ),
    meta: {
      maxWidth: 227,
    },
  }),
  columnHelper.accessor('id', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        -
      </Text>
    ),
    cell: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        ...
      </Text>
    ),
    meta: {
      maxWidth: 40,
    },
  }),
];
