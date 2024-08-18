'use client';

import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Loading from 'react-loading';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClipboardIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Grid, Text, Tooltip } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlaylist, PlaylistInfoResponse } from '@/apis/playlist';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { ToastSuccess } from '@/libs/primitives';
import { Edit, Remove } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import InfoCard from './InfoCard';

type InfoSectionProps = {
  data: PlaylistInfoResponse;
};

const InfoSection = ({ data }: InfoSectionProps) => {
  const {
    image,
    name,
    view,
    view_recent,
    view_daily,
    downloads,
    followers,
    likes,
    id,
    isPremium,
    subCategory,
  } = data;

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: removePlaylist, isLoading } = useMutation({
    mutationKey: ['delete_playlist'],
    mutationFn: () => deletePlaylist(id),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['artist_playList'] });
    },
  });

  return (
    <Flex direction={'column'} gap={'9'}>
      {/* hero */}
      <Flex justify='between'>
        <Flex gap={'3'}>
          <Image
            src={`${IMAGE_BASE_URL}${image}`}
            style={{ borderRadius: '16px', objectFit: 'cover' }}
            alt='playlist-image'
            width={80}
            height={80}
          />

          <Flex direction='column' gap={'1'} justify={'center'}>
            <Flex gap={'2'} align={'center'}>
              <Text {...typoVariant.title1} style={{ color: '#202020' }}>
                {name}
              </Text>
              <Text {...typoVariant.description1} style={{ color: isPremium ? '#3E63DD' : '#299764' }}>
                {isPremium ? 'اشتراکی' : 'رایگان'}
              </Text>
            </Flex>
            <Text {...typoVariant.description1} style={{ color: '#8D8D8D' }}>
              {subCategory.name}
            </Text>
            <CopyToClipboard text={id} onCopy={() => ToastSuccess('شناسه کپی شد')}>
              <Flex style={{ cursor: 'pointer' }} gap={'2'}>
                <ClipboardIcon />
                <Tooltip
                  content={
                    <Text {...typoVariant.body1}>
                      شما می توانید از شناسه لیست پخش در فایل های آپلودی، جهت اختصاص دادن هر اثر به لیست پخش
                      استفاده کنید
                    </Text>
                  }
                >
                  <Text {...typoVariant.description1}>کپی شناسه لیست پخش</Text>
                </Tooltip>
              </Flex>
            </CopyToClipboard>
          </Flex>
        </Flex>

        <Flex direction={'column'} gap={'2'}>
          <Link href={`/playlist/edit/${id}`}>
            <Button size={'3'} style={{ backgroundColor: '#3E63DD', width: '100%' }}>
              <Edit />
              <Text style={{ color: '#fff' }} {...typoVariant.body2}>
                ویرایش اطلاعات
              </Text>
            </Button>
          </Link>

          {/* delete modal */}
          <CustomDialog
            trigger={
              <Button
                size={'3'}
                variant='outline'
                style={{ border: '', boxShadow: 'inset 0 0 0 1px #D93D42' }}
              >
                <Remove />
                <Text style={{ color: '#D93D42' }} {...typoVariant.body2}>
                  حذف لیست پخش
                </Text>
              </Button>
            }
            content={dismiss => (
              <Flex direction={'column'} gap={'5'}>
                <Text {...typoVariant.h3} style={{ color: '#D93D42' }}>
                  حذف پلی لیست
                </Text>
                <Text style={{ color: '#646464' }} {...typoVariant.body1}>
                  {` آیا از حذف " ${name} " اطمینان دارید؟`}
                </Text>
                <Flex mt={'5'} gap={'2'} justify={'center'}>
                  <Button
                    size={'3'}
                    style={{ paddingInline: '30px', cursor: 'pointer' }}
                    onClick={() =>
                      removePlaylist(undefined, {
                        onSuccess: () => {
                          dismiss();
                          router.back();
                        },
                      })
                    }
                  >
                    {isLoading && (
                      <Box position={'absolute'}>
                        <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                      </Box>
                    )}
                    <Text {...typoVariant.body2} style={{ color: isLoading ? 'transparent' : '#646464' }}>
                      تایید
                    </Text>
                  </Button>
                  <Button
                    size={'3'}
                    style={{ paddingInline: '30px', backgroundColor: 'inherit' }}
                    onClick={dismiss}
                  >
                    <Text {...typoVariant.body2} style={{ color: '#646464', cursor: 'pointer' }}>
                      انصراف
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            )}
          />
        </Flex>
      </Flex>
      {/* info */}
      <Grid
        justify={'center'}
        align={'center'}
        gapY={'7'}
        style={{ justifyItems: 'center' }}
        columns={'3'}
        rows={'2'}
      >
        <InfoCard title={'تعداد کل بازدید ها'} value={view} />
        <InfoCard title={'تعداد بازدید های ماه اخیر'} value={view_recent} />
        <InfoCard title={'تعداد بازدید های روزانه'} value={view_daily} />
        <InfoCard title={'تعداد دانلود ها'} value={downloads} />
        <InfoCard title={'تعداد دنبال کنندگان'} value={followers} />
        <InfoCard title={'تعداد لایک ها'} value={likes} />
      </Grid>
    </Flex>
  );
};

export default InfoSection;
