import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import { StatisticsProps } from '@/types/dashboard.types';
import StatisticsItem from './statistics-item/StatisticsItem';

const Statistics = (props: StatisticsProps) => {
  const { title, cardItem, id } = props;
  return (
    <Flex
      direction={'column'}
      p={'2'}
      gap={'3'}
      style={{
        minWidth: 226,
        borderRadius: '16px',
        border: '1px solid #E0E0E0',
        boxShadow:
          '0px 2px 3px -2px rgba(0, 0, 61, 0.05), 0px 3px 12px -4px rgba(0, 0, 0, 0.05), 0px 4px 16px -8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Text
        {...typoVariant.title1}
        style={{
          color:
            title === 'وضعیت ربات'
              ? '#3E63DD'
              : title === 'وضعیت آثار'
              ? '#FFC53D'
              : title === 'آمار کاربران'
              ? '#299764'
              : '#D93D42',
        }}
      >
        {title}
      </Text>
      {cardItem &&
        cardItem.map(data => <StatisticsItem title={title} label={data.label} value={data.value} key={id} />)}
    </Flex>
  );
};

export default Statistics;
