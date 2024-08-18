import React from 'react';
import Link from 'next/link';
import { Button, Flex } from '@radix-ui/themes';
import { getUsers } from '@/apis/user';
import AccessFilter from '@/components/access-management/access-filter/AccessFilter';
import { roleConstant } from '@/components/access-management/access-management.constant';
import UserCard from '@/components/access-management/user-card/UserCard';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { routesList } from '@/constants/routes';
import { BlackPlusCircled } from '@/public/icon';

export default async function AccessManagement({
  searchParams: { role },
}: {
  searchParams: { role?: string };
}) {
  const users = await getUsers(roleConstant.find(item => item.lable === role)?.value);

  return (
    <Flex direction={'column'} gap={'6'}>
      <PageTitle title='مدیریت دسترسی ها' />
      <Flex gap={'5'} align={'center'}>
        <Button size={'3'} style={{ cursor: 'pointer' }}>
          <Flex align={'center'} gap={'2'}>
            <BlackPlusCircled />
            <Link
              href={routesList.createUser.url}
              style={{ textDecoration: 'none', color: 'var(--gray-gray-12)' }}
            >
              اضافه کردن کاربر
            </Link>
          </Flex>
        </Button>
        <AccessFilter role={role} />
      </Flex>

      <Flex direction='column' gap='4'>
        {users.map((user, idx) => (
          <UserCard key={user.id} row={idx + 1} {...user} />
        ))}
      </Flex>
    </Flex>
  );
}
