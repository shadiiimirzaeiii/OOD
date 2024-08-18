'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Text } from '@radix-ui/themes';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment-jalaali';
import Table from '@/components/shared/table/Table';
import { AuthorActionEnum, mapActivityAction } from '@/constants/activity';
import { fromNow } from '@/libs/methods/format-date';
import { typoVariant } from '@/theme/typo-variants';
import { ActivityHistory } from '@/types/access-management';
import { ActivityStatus } from './activity-history.styled';

const ActivityHistoryTable = ({ tableData }: { tableData: any[] }) => {
  const columnHelper = createColumnHelper<any>();

  const getActivityHistoryListColumns = () => [
    columnHelper.accessor('action', {
      header: () => (
        <Text {...typoVariant.description2} color={'gray'}>
          عنوان عملیات
        </Text>
      ),
      cell: cell => (
        <Text {...typoVariant.description2} color={'gray'}>
          {mapActivityAction(cell.getValue() as AuthorActionEnum)}
        </Text>
      ),
      meta: {
        preventCenterLayout: true,
        maxWidth: 250,
      },
    }),
    columnHelper.accessor('createdAt', {
      header: () => (
        <Text {...typoVariant.description2} color={'gray'}>
          زمان
        </Text>
      ),
      cell: cell => (
        <Text {...typoVariant.description2} color={'gray'}>
          {moment(cell.getValue()).format('jYYYY/jM/jD - ساعت HH:MM دقیقه')} - {fromNow(cell.getValue())} پیش
        </Text>
      ),
    }),
    columnHelper.accessor('id', {
      header: () => (
        <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.description2} color={'gray'}>
          مشاهده جزئیات
        </Text>
      ),
      cell: ({ row: { original } }: any) => (
        <Link
          href={
            original.action === AuthorActionEnum.uploadFile
              ? `/upload/${original?.upload?.id}`
              : original.action === AuthorActionEnum.createArtist ||
                original.action === AuthorActionEnum.updateArtist
              ? `/artist/info/${original?.artist?.id}`
              : original.action === AuthorActionEnum.createArtistPlaylist ||
                original.action === AuthorActionEnum.updateArtistPlaylist
              ? `/playlist/info/${original?.playlist?.id}`
              : '#'
          }
        >
          مشاهده
        </Link>
      ),
    }),
  ];

  const listColumns: any = useMemo(() => {
    return getActivityHistoryListColumns();
  }, []);

  return <Table data={tableData} columns={listColumns} />;
};

export default ActivityHistoryTable;
