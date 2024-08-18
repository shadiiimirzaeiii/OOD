'use client';

import Skeleton from 'react-loading-skeleton';
import dynamic from 'next/dynamic';
import { Flex, Text } from '@radix-ui/themes';
import { Activity } from '@/apis/activity';
import Report from '@/components/dashboard/report/Report';
import ReportItem from '@/components/dashboard/report/report-item/ReportItem';
import Statistics from '@/components/dashboard/statistics/Statistics';
import { StatisticsItemConstant } from '@/components/dashboard/statistics/statistics-item/statistics-item.constant';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { mapActivityAction } from '@/constants/activity';
import { ROLE } from '@/constants/routes';
import { useActivity } from '@/libs/hooks/useActivity';
import { useRequests } from '@/libs/hooks/useRequestList';
import { fromNow } from '@/libs/methods/format-date';
import AccessGate from '@/libs/providers/AccessGate';

const CalendarComponent = dynamic(() => import('@/components/dashboard/calendar/CalendarComponent'), {
  ssr: false,
  loading: () => <Skeleton height={600} count={1} />,
});

export default function Home() {
  const activity = useActivity();
  const requests = useRequests();

  return (
    <Flex direction={'column'} gap={'5'}>
      <PageTitle title='داشبورد' />
      <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
        <Flex justify={'between'}>
          {StatisticsItemConstant.map((item, index) => (
            <Statistics key={index} {...item} />
          ))}
        </Flex>
      </AccessGate>
      <CalendarComponent />
      <Flex gap={'7'}>
        <Report title='اخیرا اضافه شده' isLoading={activity.isLoading}>
          {activity?.data?.map((item: Activity, index: number) => (
            <ReportItem
              key={item.id}
              imageUrl={item.image ?? '/Logo.png'}
              title={mapActivityAction(item.action)}
              subKey={item.name}
              subValue={fromNow(item.createdAt)}
            />
          ))}
        </Report>
        <Report title='درخواست های اخیر' isLoading={requests.isLoading}>
          {requests?.data?.items?.map(item => (
            <ReportItem
              key={item.id}
              imageUrl={item.info.image}
              title={item.action}
              subKey={item.status}
              subValue={fromNow(item.createdAt)}
              status_code={item.status_code}
            />
          ))}
        </Report>
        <Report title='اپلیکیشن' isLoading={requests.isLoading}>
          <Text mr={'4'}>پیامی وجود ندارد</Text>
        </Report>
      </Flex>
    </Flex>
  );
}
