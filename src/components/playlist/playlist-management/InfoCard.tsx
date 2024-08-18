import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';

type Props = {
  title: string;
  value: number | string;
};

const InfoCard = ({ title, value }: Props) => {
  return (
    <Flex direction={'column'} gap={'2'} style={{ minWidth: '100px' }}>
      <Text {...typoVariant.title1} style={{ color: '#646464' }}>
        {value}
      </Text>
      <Text {...typoVariant.description1} style={{ color: '#838383' }}>
        {title}
      </Text>
    </Flex>
  );
};

export default InfoCard;
