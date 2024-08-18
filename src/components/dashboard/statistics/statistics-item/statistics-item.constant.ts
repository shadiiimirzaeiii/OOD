import { StatisticsProps } from '@/types/dashboard.types';

export const StatisticsItemConstant: StatisticsProps[] = [
  {
    id: 1,
    title: 'وضعیت ربات',
    cardItem: [
      { label: 'آخرین بروزرسانی', value: '-' },
      { label: 'کل آثار کرال شده', value: '-' },
    ],
  },

  {
    id: 2,
    title: 'وضعیت آثار',
    cardItem: [
      { label: 'آپلود ها', value: '-' },
      { label: 'دانلود ها', value: '-' },
      { label: 'ویرایش ها', value: '-' },
    ],
  },

  {
    id: 3,
    title: 'آمار کاربران',
    cardItem: [
      { label: 'لایک شده', value: '-' },
      { label: 'مشاهده شده', value: '-' },
      { label: 'پخش شده', value: '-' },
      { label: 'دنبال شده', value: '-' },
    ],
  },

  {
    id: 4,
    title: 'آمار عضویت',
    cardItem: [
      { label: 'پکیج خرید شده', value: '-' },
      { label: 'مبلغ کل', value: '-' },
      { label: 'پر طرفدارترین پکیج', value: '-' },
      { label: 'مبلغ تخفیف', value: '-' },
    ],
  },
];
