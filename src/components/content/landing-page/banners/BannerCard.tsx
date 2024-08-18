import React from 'react';
import Image from 'next/image';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Text } from '@radix-ui/themes';
import styled from 'styled-components';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import { typoVariant } from '@/theme/typo-variants';
import BannerContent from './BannerContent';

type Props = {
  image: string;
  link: string;
};

const BannerCard = ({ image, link }: Props) => {
  return (
    <Root direction={'column'} gap={'4'} p={'2'}>
      <Flex position={'relative'} style={{ width: 298, height: 164 }}>
        <Image src={image} alt={'banner'} fill style={{ borderRadius: '15px', objectFit: 'cover' }} />
      </Flex>

      <Flex align={'center'} justify={'between'}>
        <CustomDialog
          trigger={
            <IconButton variant='ghost' size={'3'} style={{ margin: 'unset' }}>
              <Pencil1Icon color='gray' />
            </IconButton>
          }
          content={dismiss => <BannerContent {...{ dismiss, image, link }} />}
        />

        <CustomDialog
          trigger={
            <IconButton variant='ghost' size={'3'} style={{ margin: 'unset' }}>
              <Cross1Icon color='gray' />
            </IconButton>
          }
          content={dismiss => (
            <Flex direction={'column'} gap={'9'}>
              <Text {...typoVariant.title1}>آیا از حذف این بنر اطمینان دارید ؟</Text>
              <Flex gap={'5'} justify={'center'}>
                <Button size={'3'} color='ruby' style={{ width: 100 }}>
                  حذف
                </Button>
                <Button variant='outline' size={'3'} style={{ width: 100 }} onClick={dismiss}>
                  بازگشت
                </Button>
              </Flex>
            </Flex>
          )}
        />
      </Flex>
    </Root>
  );
};

export default BannerCard;

const Root = styled(Flex)`
  background: #fcfcfc;
  border-radius: 16px;
  box-shadow: 0px 2px 3px -2px rgba(0, 0, 61, 0.051), 0px 3px 12px -4px rgba(0, 0, 0, 0.055),
    0px 4px 16px -8px rgba(0, 0, 0, 0.078);
`;
