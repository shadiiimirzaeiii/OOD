'use client';

import { Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import { ArtistListItemInfo } from '@/apis/artist';
import ArtistSimpleCard from '@/components/shared/artist-simple-card/ArtistSimpleCard';
import ViewAssess from '@/components/shared/view-assess/ViewAssess';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { typoVariant } from '@/theme/typo-variants';

const columnHelper = createColumnHelper<ArtistListItemInfo | any>();

export const getArtistListColumns = () => [
  columnHelper.accessor('name', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        نام هنرمند
      </Text>
    ),
    cell: ({ row: { original } }) => (
      <ArtistSimpleCard
        fullName={original.name}
        // TODO: remove hard coded image - original.artistImagePath ||
        imageUrl={`${IMAGE_BASE_URL}${original.image}`}
      />
    ),
    meta: {
      preventCenterLayout: true,
      maxWidth: 250,
    },
  }),
  columnHelper.accessor('seenCount', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        بازدیدها
      </Text>
    ),
    cell: info => <ViewAssess count={info.getValue() || 0} isExponential={false} />,
  }),
  columnHelper.accessor('followerCount', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        دنبال کنندگان
      </Text>
    ),

    cell: info => <ViewAssess count={info.getValue() || 0} isExponential={false} />,
  }),
  columnHelper.accessor('like', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        لایک ها
      </Text>
    ),
    cell: info => <Text>{info.getValue() || 0}</Text>,
  }),
  columnHelper.accessor('playForMonth', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        پخش شده در ماه
      </Text>
    ),
    cell: info => <Text>{info.getValue() || 0}</Text>,
  }),
];
