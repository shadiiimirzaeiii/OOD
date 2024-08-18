import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { typoVariant } from '@/theme/typo-variants';

const ReportItem = (props: {
  imageUrl: string;
  title: string;
  subKey: string;
  subValue: string;
  status_code?: 'REJECTED' | 'PENDING' | 'APPROVED';
}) => {
  const { imageUrl, title, subKey, subValue, status_code } = props;
  return (
    <Flex
      align={'center'}
      justify={'between'}
      px={'3'}
      py={'4'}
      style={{
        borderRadius: 12,
        marginRight: 20,
        border: '1px solid #F0F0F0',
        backgroundColor: '#F9F9F9',
        boxShadow: '0px 1.5px 2px 0px rgba(0, 0, 0, 0.13) inset;',
      }}
    >
      <Flex gap={'2'} align={'center'}>
        <Flex position={'relative'} style={{ width: 46, height: 46 }}>
          <Image src={IMAGE_BASE_URL + imageUrl} alt={title} fill style={{ borderRadius: '50%' }} />
        </Flex>
        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.body2} style={{ color: '#202020' }}>
            {title}
          </Text>
          <Flex gap={'2'} align={'center'}>
            <Text
              {...typoVariant.body2}
              style={{
                color:
                  status_code === 'APPROVED'
                    ? '#299764'
                    : status_code === 'PENDING'
                    ? '#3E63DD'
                    : status_code === 'REJECTED'
                    ? '#D93D42'
                    : '#646464',
              }}
            >
              {subKey}
            </Text>
            <Text {...typoVariant.body2} color='gray'>
              {subValue}
            </Text>
          </Flex>
          <Text {...typoVariant.description1} style={{ color: '#8D8D8D' }}></Text>
        </Flex>
      </Flex>
      <Button variant='ghost' size={'4'} style={{ cursor: 'pointer' }}>
        <Link href={''} style={{ textDecoration: 'none', color: '#646464', height: 15 }}>
          <DotsHorizontalIcon style={{ width: 16, height: 16 }} />
        </Link>
      </Button>
    </Flex>
  );
};

export default ReportItem;
