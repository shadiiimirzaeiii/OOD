'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { CameraIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { createArtist, ManageArtistFormInfo, updateArtist } from '@/apis/artist';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { useRole } from '@/libs/hooks/useRole';
import useUpload from '@/libs/hooks/useUpload';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import ImagePicker from '../../shared/image-picker/ImagePicker';

type Props = {
  action: string;
  artistFormInfo?: ManageArtistFormInfo;
  id: string | undefined;
  isRequest: boolean;
  requestId?: string;
};

const ManageArtistForm = (props: Props) => {
  const { artistFormInfo } = props;
  const searchParams = useSearchParams();
  const isDraft = !!searchParams.get('type'),
    draftId = searchParams.get('id');

  const role = useRole();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<ManageArtistFormInfo>({
    defaultValues: {
      genre: artistFormInfo?.genre,
      latinName: artistFormInfo?.latinName,
      name: artistFormInfo?.name,
    },
  });

  // TODO: fix route in success
  const { mutate: upload, isLoading: uploadLoading } = useUpload();
  const { mutate: submitArtist, isLoading } = useMutation({
    mutationFn: async (data: ManageArtistFormInfo) => {
      if (props.action === 'create') {
        return await createArtist(data);
      } else {
        return await updateArtist({
          id: props.id as string,
          ...data,
          ...(isDraft && {
            isDraft: true,
            draftId,
          }),
        });
      }
    },
    onSuccess: () => {
      ToastSuccess(props.action === 'create' ? 'اطلاعات ثبت شد' : 'اطلاعات صاحب اثر ویرایش شد');
      if (props.action === 'create') {
        router.push('/artist');
      } else {
        window.location.pathname = `/artist/info/${props.id}`;
      }

      // TODO: manage request edit
      // if (props.isRequest) {
      //   router.push(`/requests/artist/${props.requestId}`);
      // } else {
      //   router.push(`/artist/info/${props.id}`);
      // }
    },
    onError: (e: any) => ToastError(e.response.data.message ?? 'خطایی رخ داده است'),
  });

  const onSubmit = (data: ManageArtistFormInfo) => {
    upload(
      { image: data.image as File, path: 'artist' },
      { onSuccess: image => submitArtist({ ...data, image }) }
    );
  };

  const clearErrorOnChange = (field: keyof ManageArtistFormInfo) => {
    if (errors[field]) return clearErrors(field);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={'column'}>
        {/* input wrapper */}
        <Flex direction={'column'} gap={'5'}>
          {role === 'BASIC_USER' && (
            <Flex direction={'column'} gap={'2'}>
              <Text>شما کاربر عادی می باشید.</Text>
              <Text>
                در صورت ثبت اطلاعات هنرمند، درخواست ساخت برای ادمین ارسال و پس از تایید منتشر خواهد شد.
              </Text>
              <Text>قبل از تایید درخواست شما،‌اطلاعات هنرمند در لیست هنرمندان قابل رویت نمی باشد.</Text>
            </Flex>
          )}
          <Flex></Flex>
          <Flex style={{ alignSelf: 'center' }}>
            <ImagePicker
              defaultImage={artistFormInfo?.image ? `${IMAGE_BASE_URL}${props.artistFormInfo?.image}` : ''}
              title={'تصویر صاحب اثر'}
              icon={<CameraIcon />}
              onChange={image => {
                setValue('image', image as File);
                clearErrorOnChange('image');
              }}
              style={{ borderRadius: '100%' }}
            />
          </Flex>
          <Flex align={'center'} gap={'5'} wrap={'wrap'}>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ width: '48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                نام هنرمند
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : علی اصغری'
                {...register('name', {
                  required: { message: 'نام هنرمند را وارد کنید', value: true },
                })}
                error={errors && errors.name?.message}
              />
            </Flex>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ width: '48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                حوضه فعالیت
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : مداح'
                {...register('genre', {
                  required: { message: 'حوضه ی فعالیت را وارد کنید', value: true },
                })}
                error={errors && errors.genre?.message}
              />
            </Flex>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ width: '48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                نام لاتین هنرمند
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : raha tamodan'
                {...register('latinName', {
                  required: { message: 'نام لاتین هنرمند را وارد نمایید', value: true },
                })}
                error={errors && errors.latinName?.message}
              />
            </Flex>
          </Flex>
        </Flex>

        {/* buttons wrapper */}
        <Flex width={'100%'} align={'center'} justify={'center'} gap={'5'} style={{ paddingTop: 100 }}>
          <Button
            type='submit'
            size={'3'}
            style={{
              cursor: 'pointer',
              backgroundColor: '#3E63DD',
            }}
          >
            <Text
              {...typoVariant.body2}
              style={{
                color: isLoading || uploadLoading ? 'transparent' : '#fff',
                paddingInline: '24px',
                paddingBlock: '12px',
              }}
            >
              ثبت
            </Text>
            {isLoading ||
              (uploadLoading && (
                <Box position={'absolute'}>
                  <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                </Box>
              ))}
          </Button>
          <Button
            variant='outline'
            size={'3'}
            style={{
              cursor: 'pointer',
            }}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              if (props.isRequest) {
                router.push(`/requests/artist/${props.requestId}`);
              } else {
                router.back();
              }
            }}
          >
            <Text {...typoVariant.body2}>انصراف و بازگشت</Text>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default ManageArtistForm;
