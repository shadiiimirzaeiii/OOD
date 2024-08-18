import React from 'react';
import { Flex } from '@radix-ui/themes';
import { getActivity } from '@/apis/activity';
import { getUser } from '@/apis/user';
import ActivityHistoryTable from '@/components/access-management/activity-history/ActivityHistory';
import UserInfoSection from '@/components/access-management/info-section/UserInfoSection';
import PageTitle from '@/components/shared/page-title/PageTitle';

export default async function UserInfo({ params: { userId } }: { params: { userId: string } }) {
  const [user, activity] = await Promise.all([await getUser(userId), await getActivity(userId)]);

  return (
    <Flex direction={'column'} gap={'5'}>
      <Flex direction={'column'}>
        <PageTitle title='اطلاعات کاربر' backPath='/access' />
        <UserInfoSection {...user} />
      </Flex>

      <Flex width={'100%'} direction={'column'}>
        <PageTitle title='آخرین تغییرات ' />
        <Flex width={'100%'} style={{ height: 413 }}>
          <ActivityHistoryTable tableData={activity} />
        </Flex>
      </Flex>
    </Flex>
  );
}
