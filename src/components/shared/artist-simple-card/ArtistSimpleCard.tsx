'use client';

import Image from 'next/image';
import { Flex, Text } from '@radix-ui/themes';
import { styled } from 'styled-components';
import { typoVariant } from '@/theme/typo-variants';
import { ArtistSimpleCardProps } from './artist-simple-card.type';

const ArtistSimpleCard = (props: ArtistSimpleCardProps) => {
  const { fullName, imageUrl, subName } = props;
  return (
    <Flex width={'max-content'} align={'center'} gap={'4'}>
      <ArtistImage width={40} height={40} src={imageUrl} alt={''} />
      <Flex direction={'column'} gap={'2'} align={'start'}>
        <Text {...typoVariant.body1}>{fullName}</Text>
        {subName && (
          <Text {...typoVariant.description1} color='gray'>
            {subName}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ArtistSimpleCard;

const ArtistImage = styled(Image)`
  border-radius: 100%;
  overflow: hidden;
  object-fit: cover;
`;
