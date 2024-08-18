'use client';

import { useState } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import AddBannerBox from './AddBannerBox';
import BannerCard from './BannerCard';

const BannerSection = () => {
  const [banners, setBanners] = useState([
    { image: '/image/main-logo.png', link: 'www.spotify.com' },
    { image: '/image/main-logo.png', link: 'www.spotify.com' },
  ]);

  return (
    <Flex
      direction={'column'}
      gap={'5'}
      pt={'4'}
      px={'4'}
      style={{ border: '1px solid #E8E8E8', borderRadius: 16, background: '#F9F9F9' }}
    >
      <Text {...typoVariant.title2} color='gray'>
        بنر ها
      </Text>

      <Flex pb={'4'} width={'100%'} gap={'5'} style={{ overflowX: 'auto' }} className='scrollbar-hidden'>
        {banners?.map(banner => (
          <BannerCard key={banner.link} {...banner} />
        ))}
        <AddBannerBox />
      </Flex>
    </Flex>
  );
};

export default BannerSection;
