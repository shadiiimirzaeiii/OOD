'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import { ArtistPlaylist } from '@/apis/artist';
import ArtistSimpleCard from '@/components/shared/artist-simple-card/ArtistSimpleCard';
import ViewAssess from '@/components/shared/view-assess/ViewAssess';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { typoVariant } from '@/theme/typo-variants';

const columnHelper = createColumnHelper<ArtistPlaylist>();

export const getArtistPlayListColumns = () => [
  columnHelper.accessor('name', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        نام پلی لیست
      </Text>
    ),
    cell: ({ row: { original } }) => (
      <ArtistSimpleCard
        subName={original.artist?.name ?? original.subCategory.name}
        fullName={original.name}
        imageUrl={`${IMAGE_BASE_URL}${original.image}`}
      />
    ),
    meta: {
      preventCenterLayout: true,
      maxWidth: 250,
    },
  }),
  columnHelper.accessor('view', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        بازدیدها
      </Text>
    ),
    cell: info => <ViewAssess count={info.getValue() || 0} isExponential={false} />,
  }),
  columnHelper.accessor('isPremium', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        نوع
      </Text>
    ),

    cell: info => (
      <Flex
        gap={'1'}
        align={'center'}
        style={{ borderRadius: 8, padding: '2px 8px', background: info.getValue() ? '#D2F4FD' : '#DDF3E4' }}
      >
        <Box
          width={'2'}
          height={'2'}
          style={{ borderRadius: '50%', background: info.getValue() ? '#3E63DD' : '#299764' }}
        />
        <Text {...typoVariant.description2}>{info.getValue() ? 'اشتراکی' : 'رایگان'}</Text>
      </Flex>
    ),
  }),
  columnHelper.accessor('likes', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        لایک ها
      </Text>
    ),
    cell: info => <Text>{info.getValue() || 0}</Text>,
  }),
  columnHelper.accessor('followers', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        دنبال کننده
      </Text>
    ),
    cell: info => <Text>{info.getValue() || 0}</Text>,
  }),
];
