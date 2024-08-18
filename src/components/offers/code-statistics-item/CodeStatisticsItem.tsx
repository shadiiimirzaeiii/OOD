'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import { CodeStatisticsItemWrapper } from './code-statistics-Item.styled';

const CodeStatisticsItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <CodeStatisticsItemWrapper px={'4'} py={'3'} align={'center'} gap={'2'}>
      <Text {...typoVariant.description1} style={{ color: '#8D8D8D' }}>
        {label}
      </Text>
      <Text {...typoVariant.title1} style={{ color: '#646464' }}>
        {value}
      </Text>
    </CodeStatisticsItemWrapper>
  );
};

export default CodeStatisticsItem;
