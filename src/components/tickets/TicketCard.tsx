'use client';

import Link from 'next/link';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Avatar, Button, Flex, Text } from '@radix-ui/themes';
import styled from 'styled-components';
import { EllipsisText } from '@/libs/primitives/ellipsis-text/ElliipsisText';
import { typoVariant } from '@/theme/typo-variants';
import TitleDescription from '../shared/title-description/TitleDescription';

type Props = {
  hasLink?: boolean;
};

const TicketCard = ({ hasLink = true }: Props) => {
  return (
    <Root p={'4'} gap={'5'} direction={'column'} style={{ borderRadius: hasLink ? '16px' : '0 0 16px 16px' }}>
      <Flex justify={'between'} align={'center'}>
        <Flex gap={'4'} align={'center'}>
          <Avatar src={``} fallback='user' radius='full' size={'3'} />
          <EllipsisText $lineNumber={1} {...typoVariant.body1} ml={'4'}>
            نام کاربر
          </EllipsisText>
        </Flex>

        <TitleDescription title={'تاریخ ثبت'} description={'24 مهر 1402'} />
        {hasLink && (
          <Link href={'/tickets/100'}>
            <Button size={'3'} variant='ghost'>
              <EyeOpenIcon />
              <Text style={{ color: 'var(--gray-12)' }} {...typoVariant.body2}>
                مشاهده پیام
              </Text>
            </Button>
          </Link>
        )}
      </Flex>

      <TitleDescription
        title='موضوع پیام'
        description='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است'
      />
    </Root>
  );
};

export default TicketCard;

const Root = styled(Flex)`
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 61, 0.051), 0px 2px 1px -1px rgba(0, 0, 61, 0.051),
    0px 1px 3px 0px rgba(0, 0, 0, 0.055);

  border: 1px solid #f0f0f0;
`;
