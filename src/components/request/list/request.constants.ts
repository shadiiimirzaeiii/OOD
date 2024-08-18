import { RequestListItem, RequestType } from '@/apis/request';

export const requestListFilter: { label: string; value: RequestType | 'all' }[] = [
  {
    label: 'صاحب اثر',
    value: 'artist',
  },
  {
    label: 'لیست پخش',
    value: 'playlist',
  },
  {
    label: 'در انتظار بررسی',
    value: 'pending',
  },
  {
    label: 'تایید شده',
    value: 'approved',
  },
  {
    label: 'بازگردانده شده',
    value: 'rejected',
  },
];

export const RequestListSortOptions = [
  {
    label: 'جدید ترین',
    value: 'desc',
  },
  {
    label: 'قدیمی ترین',
    value: 'asc',
  },
];
