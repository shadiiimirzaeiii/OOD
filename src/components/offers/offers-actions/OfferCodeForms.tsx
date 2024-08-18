'use client';

/* eslint-disable react/jsx-key */
import { startTransition } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useForm } from 'react-hook-form';
import Loading from 'react-loading';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { useParams, useRouter } from 'next/navigation';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Switch, Text, TextField } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { newDate } from 'date-fns-jalali';
import { format } from 'date-fns-jalali/format';
import styled from 'styled-components';
import { createOffer, editOffer } from '@/apis/offer';
import { convertToLatinDigits } from '@/libs/methods';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import { OfferCodeFromTypes } from '@/types/offers.types';

type Props = {
  offerCodeInfo?: OfferCodeFromTypes & { id: string };
  action: 'create' | 'edit';
};

const OfferCodeForms = ({ offerCodeInfo, action }: Props) => {
  const router = useRouter();
  const { offerId } = useParams();

  const toIsoDate = (str: string) => {
    const englishDigitDate = convertToLatinDigits(str);
    const [year, month, day] = englishDigitDate.split('/');
    return newDate(+year, +month - 1, +day).toISOString();
  };

  const formMethods = useForm<OfferCodeFromTypes>({
    defaultValues: {
      ...offerCodeInfo,
      active: offerCodeInfo?.active ? offerCodeInfo.active : false,
      startDate: offerCodeInfo?.startDate ? format(offerCodeInfo?.startDate as string, 'yyyy/MM/dd') : '',
      endDate: offerCodeInfo?.endDate ? format(offerCodeInfo?.endDate as string, 'yyyy/MM/dd') : '',
    },
    mode: 'onChange',
  });
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;

  const { mutate: submitOfferCode, isLoading } = useMutation({
    mutationFn: async (data: OfferCodeFromTypes) => {
      const payload = {
        ...data,
        startDate: toIsoDate(data.startDate),
        endDate: toIsoDate(data.endDate),
        percent: +data.percent,
        quantity: +data.quantity,
      };

      if (action === 'create') {
        return await createOffer(payload);
      }
      return await editOffer({ ...payload, id: offerId as string });
    },
    onSuccess: async () => {
      ToastSuccess('عملیات با موفقیت ثبت شد');

      startTransition(() => {
        action === 'edit' ? router.push(`/offer/info/${offerId}`) : router.push(`/offer`);
        router.refresh();
      });
    },
    onError: (err: any) => ToastError(err.response.data.data),
  });

  const onSubmit = (data: OfferCodeFromTypes) => {
    return submitOfferCode({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction='column' gap={'8'}>
        <Flex direction='column' gap={'8'}>
          <Flex wrap={'wrap'} align='center' gap={'5'}>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                عنوان کد تخفیف
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : کد تخفیف سال جدید'
                {...register('name', {
                  required: { message: 'نام کد تخفیف را وارد کنید', value: true },
                })}
                error={errors.name?.message as string}
              />
            </Flex>
            <Text as='label' {...typoVariant.body2} style={{ width: 'fit-content' }}>
              <Flex gap='2' align={'center'}>
                {watch('active') ? 'فعال' : 'غیرفعال'}
                <StyledSwitch
                  size={'3'}
                  defaultChecked={watch('active')}
                  onCheckedChange={(checked: boolean) => setValue('active', checked)}
                />
              </Flex>
            </Text>
          </Flex>
          <Flex width='100%' wrap={'nowrap'} gap={'5'}>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                کد تخفیف
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : #489471'
                {...register('code', {
                  required: { message: 'کد تخفیف را وارد کنید', value: true },
                })}
                error={errors.code?.message as string}
              />
            </Flex>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                میزان تخفیف
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : %15'
                {...register('percent', {
                  required: { message: 'میزان تخفیف را وارد کنید', value: true },
                })}
                error={errors.percent?.message as string}
              />
            </Flex>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                تعداد کد
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال : 1200'
                {...register('quantity', {
                  required: { message: 'تعداد کد را وارد کنید', value: true },
                })}
                error={errors.quantity?.message as string}
              />
            </Flex>
          </Flex>
          <Flex width='100%' wrap={'nowrap'} gap={'5'}>
            <Flex
              direction={'column'}
              gap={'1'}
              pb={'4'}
              style={{ width: '100%', flex: '1 1 48%', position: 'relative' }}
            >
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                تاریخ شروع
              </Text>
              <TextField.Root>
                <TextField.Input
                  value={watch('startDate')}
                  size={'3'}
                  placeholder='مثال : ۱۴۰۱/۸/۲۴'
                  {...register('startDate', {
                    required: {
                      message: 'لطفاً تاریخ را مشخص کنید',
                      value: true,
                    },
                  })}
                />
                <TextField.Slot>
                  <CalendarIcon />
                </TextField.Slot>
              </TextField.Root>
              {errors.startDate?.message && (
                <Text size={'2'} weight={'medium'} as='label' color='tomato' style={{ marginTop: 5 }}>
                  {errors.startDate?.message as string}
                </Text>
              )}
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition='bottom-right'
                style={{ width: '100%' }}
                onChange={(dateObject: DateObject | DateObject[] | any) => {
                  setValue('startDate', dateObject.format());
                }}
              />
            </Flex>
            <Flex
              direction={'column'}
              gap={'1'}
              pb={'4'}
              style={{ width: '100%', flex: '1 1 48%', position: 'relative' }}
            >
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                تاریخ انقضاء
              </Text>
              <TextField.Root>
                <TextField.Input
                  value={watch('endDate')}
                  size={'3'}
                  placeholder='مثال : ۱۴۰۱/۸/۲۴'
                  {...register('endDate', {
                    required: {
                      message: 'لطفاً تاریخ را مشخص کنید',
                      value: true,
                    },
                  })}
                />
                <TextField.Slot>
                  <CalendarIcon />
                </TextField.Slot>
              </TextField.Root>
              {errors.endDate?.message && (
                <Text size={'2'} weight={'medium'} as='label' color='tomato' style={{ marginTop: 5 }}>
                  {errors.endDate?.message as string}
                </Text>
              )}
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition='bottom-right'
                style={{ width: '100%' }}
                onChange={(dateObject: DateObject | DateObject[] | any) => {
                  setValue('endDate', dateObject.format());
                }}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={'5'} justify={'center'}>
          <Button type='submit' size={'3'} style={{ background: '#3E63DD', width: 100, cursor: 'pointer' }}>
            {isLoading && (
              <Box position={'absolute'}>
                <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
              </Box>
            )}
            <Text {...typoVariant.body2} style={{ color: isLoading ? 'transparent' : '#fff' }}>
              ثبت
            </Text>
          </Button>
          <Button
            size={'3'}
            variant='outline'
            onClick={e => {
              e.preventDefault();
              router.back();
            }}
          >
            <Text {...typoVariant.body2}>انصراف و بازگشت</Text>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default OfferCodeForms;

const StyledSwitch = styled(Switch)`
  .rt-SwitchThumb {
    position: absolute;
    left: 1px;
    cursor: pointer;
  }
`;
