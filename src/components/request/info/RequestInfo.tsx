'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircledIcon, InfoCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { Avatar, Badge, Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { RequestListItem } from '@/apis/request';
import TrackSection from '@/components/playlist/playlist-management/TrackSection';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { ROLE } from '@/constants/routes';
import { useResponse } from '@/libs/hooks/useResponse';
import { formatDate, fromNow } from '@/libs/methods/format-date';
import AccessGate from '@/libs/providers/AccessGate';
import { Edit } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import RejectRequestDialog from './RejectRequestDialog';

type Props = {
  data: RequestListItem;
  type: 'artist' | 'playlist';
};

const RequestInfo = (props: Props) => {
  const { data, type } = props;

  const router = useRouter();
  const { mutate, isLoading } = useResponse();

  const onSubmit = () =>
    mutate({
      id: props.data.info.id,
      status: true,
      draftType: props.data.type_code,
    });

  return (
    <Card>
      <Flex direction={'column'} gap={'8'}>
        {data.type_code === 'PLAYLIST' && data.info.artist && (
          <Flex justify={'between'} align={'center'} gap='4'>
            <Flex align={'center'} gap='4'>
              <Avatar
                size={'7'}
                radius='full'
                src={`${IMAGE_BASE_URL}${props.data.info.artist.image}`}
                fallback={'/image/main-log.png'}
                alt='صاحب اثر'
              />
              <div>
                <Text {...typoVariant.title2}>{data.info.artist.name}</Text>
                <TitleDescription title={'حوزه فعالیت'} description={data.info.artist.genre} />
              </div>
            </Flex>

            <Link href={`/artist/info/${data.info.artist.id}`} style={{ textDecoration: 'none' }}>
              <Flex align={'center'} gap='1'>
                <InfoCircledIcon />
                <Text {...typoVariant.description1}>بیشتر</Text>
              </Flex>
            </Link>
          </Flex>
        )}
        <Card>
          <Flex direction={'column'} gap={'4'}>
            <Flex direction={'column'} gap='8'>
              <Flex width={'100%'} justify={'between'}>
                <Flex align='center' gap='4'>
                  <Avatar
                    size={'7'}
                    src={`${IMAGE_BASE_URL}${props.data.info.image}`}
                    fallback={'/image/main-log.png'}
                    alt='عکس درخواست'
                  />
                  <Grid gap={'4'} columns={'2'}>
                    <TitleDescription title={'نام'} description={data.info.name} />
                    <TitleDescription title={'نام به لاتین'} description={data.info.latinName} />
                    {data.info.genre && (
                      <TitleDescription title={'زمینه فعالیت'} description={data.info.genre} />
                    )}
                    <TitleDescription
                      title={'تاریخ ثبت'}
                      description={`${formatDate(data.createdAt)} - ${fromNow(data.createdAt)} پیش`}
                    />
                    <TitleDescription title={'درخواست ساخت توسط: '} description={data.createdBy.name} />
                  </Grid>
                </Flex>
                <Flex direction={'column'} justify={'between'} align={'end'} gap='4'>
                  <Box width={{ initial: '100%', sm: 'max-content' }}>
                    <Badge
                      size={{ initial: '1', sm: '2' }}
                      style={{
                        background: 'none',
                        borderRadius: 8,
                        width: '100%',
                        display: 'grid',
                        placeContent: 'center',
                      }}
                    >
                      <TitleDescription
                        descriptionVariant={'title3'}
                        title={'وضعیت'}
                        description={data.status}
                        descriptionColor={
                          data.status_code === 'PENDING'
                            ? 'var(--blue-10)'
                            : data.status_code === 'APPROVED'
                            ? 'var(--teal-8)'
                            : 'var(--tomato-11)'
                        }
                      />
                    </Badge>
                  </Box>

                  {data.status_code !== 'APPROVED' && (
                    <Button
                      onClick={() => router.push(`/${type}/edit/${data.id}?type=request&id=${data.info.id}`)}
                      size={'3'}
                      style={{ backgroundColor: '#3E63DD' }}
                    >
                      <Edit />
                      <Text style={{ color: '#fff' }} {...typoVariant.body2}>
                        ویرایش اطلاعات
                      </Text>
                    </Button>
                  )}
                  <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
                    {data.status_code === 'PENDING' && data.isActive && (
                      <Flex gap={'4'} align={'center'}>
                        <Button size={'3'} color='teal' disabled={isLoading} onClick={onSubmit}>
                          <CheckCircledIcon />
                          <Text {...typoVariant.body2}>تایید و انتشار</Text>
                        </Button>

                        <RejectRequestDialog
                          id={data.info.id}
                          draftType={data.type_code}
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
              </Flex>

              {data.type_code === 'PLAYLIST' && data.info.tracks && <TrackSection data={data.info.tracks} />}
            </Flex>

            {data.rejectionReason && (
              <Flex direction={'column'} gap={'2'}>
                <Text {...typoVariant.title2} color='tomato'>
                  دلیل رد شدن درخواست
                </Text>
                <Text {...typoVariant.body1}>{data.rejectionReason}</Text>
              </Flex>
            )}
          </Flex>
        </Card>
      </Flex>
    </Card>
  );
};

export default RequestInfo;
