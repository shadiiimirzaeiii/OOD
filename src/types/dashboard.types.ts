export type StatisticsProps = {
  title: StatisticsTitleProps;
  cardItem: StatisticsItemProps[];
  id: number;
};

export type StatisticsTitleProps = 'وضعیت ربات' | 'وضعیت آثار' | 'آمار کاربران' | 'آمار عضویت';

export type StatisticsItemProps = {
  label: string;
  value: string;
};

export type ReportProps = {
  title: ReportTitleProps;
  reportCard: ReportCardProps[];
  id: number;
};

export type ReportTitleProps = 'اخیرا اضافه شده' | 'درخواست های اخیر' | 'پیام کاربران';

export type ReportCardProps = {
  imageUrl: string;
  title: string;
  subKey: string;
  subValue: string;
};
