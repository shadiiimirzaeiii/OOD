import React from 'react';
import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button, Flex, Grid, Text } from '@radix-ui/themes';
import moment from 'moment-jalaali';
import UserAvatar from '@/components/shared/user-avatar/UserAvatar';
import { routesList } from '@/constants/routes';
import { typoVariant } from '@/theme/typo-variants';
import { UserInfo } from '@/types/access-management';

const UserInfoSection = ({ name, username, role, id, image, nationalCode, lastLoginDate }: UserInfo) => (
  <Flex width={'100%'} pb={'7'}>
    <Grid gapX={'7'} style={{ gridTemplateColumns: '1fr 3fr' }}>
      <UserAvatar imagePath={image} alt={`تصویر ${name}`} />
      <Grid columns={'2'} rows={'2'} gapX={'4'} gapY={'5'} py={'5'} flow={'row'}>
        <Flex align={'center'} gap={'4'}>
          <Text {...typoVariant.h3} style={{ color: '#646464' }}>
            {name}
          </Text>
          <Link href={routesList.editUser.url(id)}>
            <Button variant='ghost' color='sky' style={{ cursor: 'pointer' }}>
              <Pencil1Icon style={{ width: 16, height: 16, color: '#646464', marginTop: 4 }} />
            </Button>
          </Link>
        </Flex>
        <Flex
          width={'max-content'}
          align={'center'}
          px={'2'}
          py={'1'}
          style={{ backgroundColor: '#F0F4FF', borderRadius: '8px' }}
        >
          <Text as='label' {...typoVariant.body2} color='sky'>
            {role}
          </Text>
        </Flex>
        <Flex gap={'2'} align={'center'}>
          <Text as='label' {...typoVariant.body1} style={{ color: '#BBBBBB' }}>
            شماره تماس
          </Text>
          <Text as='label' {...typoVariant.body1} style={{ color: '#646464' }}>
            {username}
          </Text>
        </Flex>
        <Flex gap={'2'} align={'center'}>
          <Text as='label' {...typoVariant.body1} style={{ color: '#BBBBBB' }}>
            کد ملی
          </Text>
          <Text as='label' {...typoVariant.body1} style={{ color: '#646464' }}>
            {nationalCode}
          </Text>
        </Flex>
        <Flex gap={'2'} align={'center'}>
          <Text as='label' {...typoVariant.body1} style={{ color: '#BBBBBB' }}>
            آخرین ورود به پنل
          </Text>
          <Text as='label' {...typoVariant.body1} style={{ color: '#646464' }}>
            {lastLoginDate ? moment(lastLoginDate).format('تاریخ - jYYYY/jMM/jDD - ساعت - HH:mm') : '-'}
          </Text>
        </Flex>
      </Grid>
    </Grid>
  </Flex>
);

export default UserInfoSection;
