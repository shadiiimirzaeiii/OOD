'use client';

import Image from 'next/image';
import { Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import EditCategory from '@/components/categories/edit-category/EditCategory';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { typoVariant } from '@/theme/typo-variants';
import { SubCategoryItem } from '@/types/categories';

const columnHelper = createColumnHelper<SubCategoryItem>();

export const getSubCategoryListColumns = () => [
  columnHelper.accessor('image', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        تصویر
      </Text>
    ),
    cell: ({ row: { original } }) => (
      <Image
        width={24}
        height={24}
        style={{ borderRadius: 4, objectFit: 'cover', overflow: 'hidden' }}
        src={IMAGE_BASE_URL + original.image}
        alt={original.latinName}
      />
    ),
    meta: {
      maxWidth: 48,
    },
  }),
  columnHelper.accessor('name', {
    header: () => (
      <Text {...typoVariant.description2} color={'gray'}>
        نام زیر دسته بندی
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
  columnHelper.accessor('isActive', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        تعداد لیست های پخش
      </Text>
    ),

    cell: info => (
      <Text {...typoVariant.description2} color={'gray'}>
        0
      </Text>
    ),
    meta: {
      maxWidth: 300,
    },
  }),
  columnHelper.accessor('categoryId', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        لتعداد آثار زیرمجموعه
      </Text>
    ),
    cell: info => (
      <Text {...typoVariant.description2} color={'gray'}>
        0
      </Text>
    ),
    meta: {
      maxWidth: 300,
    },
  }),
  columnHelper.accessor('id', {
    header: () => (
      <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
        -
      </Text>
    ),
    cell: ({ row: { original } }) => <EditCategory type='subCategory' {...original} />,
    meta: {
      maxWidth: 40,
    },
  }),
];
