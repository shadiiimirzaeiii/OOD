'use client';

import { useForm } from 'react-hook-form';
import Loading from 'react-loading';
import Skeleton from 'react-loading-skeleton';
import { Button, Card, Flex, Switch, Text } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import PageTitle from '@/components/shared/page-title/PageTitle';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { ROLE } from '@/constants/routes';
import {
  QUERY_QUALITY_LIST,
  useCreateQuality,
  useQualityList,
  useUpdateQuality,
} from '@/libs/hooks/useTrack';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { Input } from '@/libs/primitives/input/Input';
import AccessGate from '@/libs/providers/AccessGate';
import { typoVariant } from '@/theme/typo-variants';

export default function Quality() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      isPremium: false,
      bitrate: '',
      format: '',
    },
  });

  const queryClient = useQueryClient();
  const quality = useQualityList();
  const updateQuality = useUpdateQuality();
  const createQuality = useCreateQuality();

  if (quality.isLoading) <Skeleton count={3} width={'100%'} height={'50px'} />;

  return (
    <>
      <PageTitle title='لیست کیفیت ها' backPath='/upload' />
      <Flex direction={'column'} gap={'4'}>
        <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN]}>
          <CustomDialog
            trigger={<Button color='teal'>تعریف کیفیت</Button>}
            content={dismiss => (
              <Flex direction={'column'} gap={'4'}>
                <Text {...typoVariant.h2} align={'center'}>
                  تعریف کیفیت
                </Text>

                <Flex gap={'2'} wrap={'wrap'}>
                  <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
                    <Text as='label' style={{ color: '--var(gray-gray-11)' }}>
                      نام
                    </Text>
                    <Input
                      width={'100%'}
                      {...register('name', {
                        required: { message: 'این فیلد الزامیست', value: true },
                      })}
                      error={errors && (errors.name?.message as string)}
                    />
                  </Flex>
                  <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
                    <Text as='label' style={{ color: '--var(gray-gray-11)' }}>
                      بیت ریت
                    </Text>
                    <Input {...register('bitrate')} />
                  </Flex>
                  <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
                    <Text as='label' style={{ color: '--var(gray-gray-11)' }}>
                      فرمت
                    </Text>
                    <Input {...register('format')} />
                  </Flex>
                  <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
                    <Text as='label' style={{ color: '--var(gray-gray-11)' }}>
                      نوع اشتراک
                    </Text>
                    <Flex gap={'2'}>
                      <StyledSwitch
                        {...register('isPremium')}
                        onCheckedChange={(checked: boolean) => setValue('isPremium', checked)}
                      />
                      <Text>{watch('isPremium') ? 'اشتراکی' : 'رایگان'}</Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex justify={'center'} align={'center'} gap={'4'}>
                  <Button
                    disabled={createQuality.isLoading}
                    color='blue'
                    onClick={handleSubmit(data => {
                      createQuality.mutate(data, {
                        onSuccess: () => {
                          ToastSuccess('کیفیت ساخته شد');
                          queryClient.invalidateQueries([QUERY_QUALITY_LIST]);
                          dismiss();
                          reset();
                        },
                        onError: e => ToastError((e as any).response.data.message),
                      });
                    })}
                  >
                    {createQuality.isLoading ? (
                      <Loading type='spin' color='#000' width={'14px'} height={'14px'} />
                    ) : (
                      'تایید'
                    )}
                  </Button>
                  <Button color='gray' disabled={createQuality.isLoading} onClick={dismiss}>
                    انصراف
                  </Button>
                </Flex>
              </Flex>
            )}
          />
        </AccessGate>
        {quality.data?.map(q => (
          <Card>
            <Flex justify={'between'}>
              <Flex gap={'4'}>
                <TitleDescription title={'شناسه یکتا'} description={q.id} />
                <TitleDescription title={'نام کیفیت'} description={q.name} />
                <TitleDescription title={'bitrate'} description={q.bitrate ?? 'تعریف نشده است'} />
                <TitleDescription title={'فرمت'} description={q.format ?? 'تعریف نشده است'} />
                <TitleDescription
                  title={'دسترسی به کیفیت'}
                  description={q.isPremium ? 'اشتراکی' : 'رایگان'}
                />
                <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN]}>
                  <StyledSwitch
                    size={'3'}
                    disabled={updateQuality.isLoading}
                    defaultChecked={q.isPremium}
                    onCheckedChange={(checked: boolean) => {
                      updateQuality.mutate(
                        {
                          id: q.id,
                          isPremium: checked,
                        },
                        {
                          onSuccess: () => {
                            ToastSuccess('نوع اشتراک ویرایش شد');
                            queryClient.invalidateQueries([QUERY_QUALITY_LIST]);
                          },
                          onError: () => ToastError('خطایی رخ داده است. مجددا تلاش کنید'),
                        }
                      );
                    }}
                  />
                </AccessGate>
              </Flex>

              <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN]}>
                <CustomDialog
                  trigger={<Button color='blue'>ویرایش</Button>}
                  content={dismiss => (
                    <Flex direction={'column'} gap={'4'}>
                      <Text {...typoVariant.title2} align={'center'}>
                        ویرایش کیفیت {q.name}
                      </Text>

                      <Flex>
                        <Input title='نام کیفیت' disabled value={q.name} />
                        {/* <Input title='نام کیفیت' disabled value={q.isPremium} /> */}
                      </Flex>

                      <Flex justify={'center'} align={'center'} gap={'4'}>
                        <Button color='gray'>انصراف</Button>
                        <Button color='blue'>تایید</Button>
                      </Flex>
                    </Flex>
                  )}
                />
              </AccessGate>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
}

const StyledSwitch = styled(Switch)`
  .rt-SwitchThumb {
    position: absolute;
    left: 1px;
  }
`;
