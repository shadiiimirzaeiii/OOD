'use client';

import { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Flex, ScrollArea, Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';

type Props = { title: string; isLoading: boolean; children: ReactNode };

const Report = ({ title, isLoading, children }: Props) => {
  return (
    <Flex
      direction={'column'}
      px={'2'}
      py={'4'}
      gap={'3'}
      style={{
        flex: 1,
        maxHeight: 432,
        borderRadius: 16,
        border: '1px solid #E0E0E0',
        boxShadow:
          '0px 2px 3px -2px rgba(0, 0, 61, 0.05), 0px 3px 12px -4px rgba(0, 0, 0, 0.05), 0px 4px 16px -8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Text {...typoVariant.title1} style={{ color: '#646464' }}>
        {title}
      </Text>
      <Flex direction={'row-reverse'}></Flex>
      <ScrollArea type='always' radius='full' size={'2'} scrollbars='vertical'>
        <Flex direction={'column'} gap={'3'} style={{ overflow: 'hidden' }}>
          {isLoading ? <Skeleton height={'86px'} count={5} /> : children}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default Report;
