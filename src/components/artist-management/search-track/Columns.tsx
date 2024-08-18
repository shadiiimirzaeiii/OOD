'use client';

import { Dispatch, SetStateAction } from 'react';
import { Checkbox, Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns-jalali/format';
import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { typoVariant } from '@/theme/typo-variants';

const columnHelper = createColumnHelper<TrackItem>();

export const getTrackColumns = (selectionState: [TrackItem[], Dispatch<SetStateAction<TrackItem[]>>]) => {
  const [rowSelection, setRowSelection] = selectionState;

  return [
    columnHelper.accessor('id', {
      header: ({ table }) => {
        const allRowIds = table.getRowModel().flatRows.map(row => row.original);

        const isAllRowsSelected = allRowIds
          .map(item => item.id)
          .every(item => rowSelection.map(({ id }) => id).includes(item));

        return (
          <Checkbox
            size='3'
            checked={isAllRowsSelected}
            onCheckedChange={checked => {
              if (checked) {
                return setRowSelection(allRowIds);
              }
              return setRowSelection([]);
            }}
          />
        );
      },
      cell: ({ row: { original } }) => (
        <Checkbox
          size='3'
          checked={rowSelection.map(item => item.id).includes(original.id)}
          onCheckedChange={isChecked => {
            if (isChecked) {
              return setRowSelection(prev => [...prev, original]);
            }
            return setRowSelection(prev => prev.filter(row => row.id !== original.id));
          }}
        />
      ),
      meta: {
        preventCenterLayout: false,
        maxWidth: 40,
      },
    }),
    columnHelper.accessor('title', {
      header: () => (
        <Text {...typoVariant.description2} color={'gray'}>
          نام اثر
        </Text>
      ),
      cell: info => <Text>{info.getValue()}</Text>,
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
    }),
  ];
};
