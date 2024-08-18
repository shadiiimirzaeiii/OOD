'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import { StatisticsTitleProps } from '@/types/dashboard.types';
import { StatisticsItemWrapper } from './statistics-Item.styled';

type Props = {
  title: StatisticsTitleProps;
  label: string;
  value: string;
};

const StatisticsItem = ({ title, label, value }: Props) => {
  return (
    <StatisticsItemWrapper px={'4'} py={'3'} align={'center'} gap={'3'} title={title}>
      <Text {...typoVariant.description1} style={{ color: '#8D8D8D' }}>
        {label}
      </Text>
      <Text {...typoVariant.body1} style={{ color: '#646464' }}>
        {value}
      </Text>
    </StatisticsItemWrapper>
  );
};

export default StatisticsItem;
