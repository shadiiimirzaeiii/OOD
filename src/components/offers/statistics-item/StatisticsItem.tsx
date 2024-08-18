'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import { StatisticsItemWrapper } from './statistics-Item.styled';

const StatisticsItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <StatisticsItemWrapper px={'4'} py={'3'} align={'center'} gap={'2'} style={{ width: '100%' }}>
      <Text {...typoVariant.description1} style={{ color: '#8D8D8D' }}>
        {label}
      </Text>
      <Text {...typoVariant.title1}>{value}</Text>
    </StatisticsItemWrapper>
  );
};

export default StatisticsItem;
