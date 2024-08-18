import React from 'react';
import Image from 'next/image';
import { Flex } from '@radix-ui/themes';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import UserFallBackAvatar from '@/public/image/UserFallBack.jpg';

const UserAvatar = ({ imagePath, alt }: { imagePath?: string; alt: string }) => {
  return (
    <Flex position={'relative'} style={{ width: 120, height: 120 }}>
      {imagePath ? (
        <Image
          src={IMAGE_BASE_URL + imagePath}
          alt={alt}
          fill
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : (
        <Image src={UserFallBackAvatar} alt={alt} fill style={{ borderRadius: '50%' }} />
      )}
    </Flex>
  );
};

export default UserAvatar;
