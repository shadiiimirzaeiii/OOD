'use client';

import { Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import { OfferListItem } from '@/apis/offer';
import { typoVariant } from '@/theme/typo-variants';

const columnHelper = createColumnHelper<OfferListItem>();

export const getOfferListColumns = () => [
  columnHelper.accessor('id', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        شماره
      </Text>
    ),
    cell: ({ row: { index } }) => (
      <Text {...typoVariant.description2} color={'gray'}>
        {index + 1}
      </Text>
    ),
    meta: {
      maxWidth: 48,
    },
  }),
  columnHelper.accessor('name', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        عنوان
      </Text>
    ),
    cell: info => (
      <Text {...typoVariant.description2} color={'gray'}>
        {info.getValue()}
      </Text>
    ),
    meta: {
      maxWidth: 300,
    },
  }),
  columnHelper.accessor('code', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        کد تخفیف
      </Text>
    ),

    cell: info => (
      <Text {...typoVariant.description2} color={'gray'}>
        {info.getValue()}
      </Text>
    ),
    meta: {
      maxWidth: 300,
    },
  }),
  columnHelper.accessor('active', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        وضعیت
      </Text>
    ),
    cell: info => (
      <Text {...typoVariant.description2} color={info.getValue() ? 'green' : 'red'}>
        {info.getValue() ? 'فعال' : 'غیر فعال'}
      </Text>
    ),
    meta: {
      maxWidth: 300,
    },
  }),
  columnHelper.accessor('percent', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        میزان تخفیف
      </Text>
    ),
    cell: ({ row: { original } }) => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        % {original.percent}
      </Text>
    ),
    meta: {
      maxWidth: 40,
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
