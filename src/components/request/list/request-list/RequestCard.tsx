'use client';

import Link from 'next/link';
import { CheckCircledIcon, InfoCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { Avatar, Badge, Box, Button, Flex, Text } from '@radix-ui/themes';
import { formatDistance } from 'date-fns-jalali';
import moment from 'moment-jalaali';
import styled from 'styled-components';
import { RequestListItem } from '@/apis/request';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { ROLE } from '@/constants/routes';
import { useResponse } from '@/libs/hooks/useResponse';
import { EllipsisText } from '@/libs/primitives/ellipsis-text/ElliipsisText';
import AccessGate from '@/libs/providers/AccessGate';
import { typoVariant } from '@/theme/typo-variants';
import RejectRequestDialog from '../../info/RejectRequestDialog';
import { getBadgeColor } from '../../request.constant';

const RequestCard = (props: RequestListItem) => {
  const { info, isActive, status_code } = props;

  const fromNow = formatDistance(new Date(props.createdAt), new Date(), {
    addSuffix: false,
  });

  const date = moment(props.createdAt).format('jYYYY/jM/jD');

  const { mutate, isLoading } = useResponse();

  const onSubmit = () =>
    mutate({
      id: props.info.id,
      status: true,
      draftType: props.type_code,
    });

  return (
    <Card $isActive={isActive} direction={'column'} gap={{ initial: '5', sm: '7' }}>
      <Flex
        align={{ initial: 'start', sm: 'center' }}
        gap={'4'}
        wrap={'wrap'}
        justify={'between'}
        direction={{ initial: 'column-reverse', sm: 'row' }}
      >
        <Flex gap={'4'} align={'center'}>
          <Avatar src={`${IMAGE_BASE_URL}${info.image}`} fallback='avatar' radius='full' size={'4'} />
          <EllipsisText $lineNumber={1} {...typoVariant.body1} ml={'4'}>
            {props.info.name}
          </EllipsisText>
          <TitleDescription
            descriptionVariant={'title3'}
            title={'وضعیت'}
            description={props.status}
            descriptionColor={
              props.status_code === 'PENDING'
                ? 'var(--blue-10)'
                : props.status_code === 'APPROVED'
                ? 'var(--teal-8)'
                : 'var(--tomato-11)'
            }
          />
          <TitleDescription title={'تاریخ ثبت'} description={`${date} - ${fromNow} پیش`} />
        </Flex>
        <Box width={{ initial: '100%', sm: 'max-content' }}>
          <Badge
            size={{ initial: '1', sm: '2' }}
            style={{
              background: getBadgeColor(props.action_code),
              borderRadius: 8,
              width: '100%',
              display: 'grid',
              placeContent: 'center',
            }}
          >
            <Text {...typoVariant.description2} style={{ color: '#000' }}>
              {props.action}
            </Text>
          </Badge>
        </Box>
      </Flex>

      <Flex justify={'between'} direction={'row-reverse'} align={'baseline'}>
        <Link href={`/requests/${props.type_code.toLowerCase()}/${props.id}`}>
          <Button
            // onClick={e => e.preventDefault()}
            size={'3'}
            variant='ghost'
            color='gray'
            ml={{ initial: '0', sm: '4' }}
          >
            <InfoCircledIcon />
            <Text as='span' {...typoVariant.body2} style={{ color: 'black' }}>
              {'بیشتر'}
            </Text>
          </Button>
        </Link>
        <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
          {status_code === 'PENDING' && isActive && (
            <Flex gap={'4'} align={'center'}>
              <Button size={'3'} color='teal' disabled={isLoading} onClick={onSubmit}>
                <CheckCircledIcon />
                <Text {...typoVariant.body2}>تایید و انتشار</Text>
              </Button>

              <RejectRequestDialog
                id={props.info.id}
                draftType={props.type_code}
                trigger={
                  <Button size={'3'} variant='outline' color='red'>
                    <MinusCircledIcon />
                    <Text {...typoVariant.body2}>بازگرداندن</Text>
                  </Button>
                }
              />
            </Flex>
          )}
        </AccessGate>
      </Flex>
    </Card>
  );
};

export default RequestCard;

export const Card = styled(Flex)<{ $isActive: boolean }>`
  box-shadow: -2px 4px 16px -4px rgba(18, 43, 76, 0.2);
  border-radius: 16px;
  padding: 16px;
  background-color: ${({ $isActive }) => ($isActive ? 'var(--gray-1)' : 'var(--gray-3)')};
`;
