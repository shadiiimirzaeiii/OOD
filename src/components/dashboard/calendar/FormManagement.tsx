'use client';

/* eslint-disable react/jsx-key */
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useForm } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment-jalaali';
import { CreateEvent, createEvent, editEvent, EventInfo } from '@/apis/event';
import { convertToLatinDigits, convertToStandardDateTime } from '@/libs/methods';
import { getTimeFromDate } from '@/libs/methods/time-from-date';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { typoVariant } from '@/theme/typo-variants';

type FormManagementProps = {
  title?: string;
  status: 'create' | 'edit';
  isShowDialog: boolean;
  onCloseModal: (value: boolean) => void;
  data?: EventInfo;
};

export type FormProps = {
  title: string;
  description: string;
  startTime: string;
  startDate: string;
  endDate: string;
  endTime: string;
};

const FormManagement = ({ isShowDialog, data, onCloseModal, status, title }: FormManagementProps) => {
  const queryClient = useQueryClient();
  const invalidateEvents = () => queryClient.invalidateQueries({ queryKey: ['events'] });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormProps>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CreateEvent) => {
      return createEvent(data);
    },
    onSuccess: () => {
      invalidateEvents();
      ToastSuccess('پیام با موفقیت ثبت شد');
      onCloseModal(false);
    },
    onError: () => ToastError('خطا در ثبت پیام'),
  });

  const { mutate: editMutate, isLoading: editIsLoading } = useMutation({
    mutationFn: (data: Partial<CreateEvent> & { id: string }) => {
      const { id, ...rest } = data;
      return editEvent(id, rest);
    },
    onSuccess: () => {
      invalidateEvents();
      ToastSuccess('پیام با موفقیت ویرایش شد');
      onCloseModal(false);
    },
    onError: () => ToastError('خطا در ویرایش پیام'),
  });

  const onSubmit = (formData: FormProps) => {
    const startDate = convertToStandardDateTime(
      convertToLatinDigits(formData.startDate),
      formData.startTime
    ).toISOString();
    const endDate = convertToStandardDateTime(
      convertToLatinDigits(formData.endDate),
      formData.endTime
    ).toISOString();

    const finalData: CreateEvent = { ...formData, startDate, endDate };

    if (status === 'create') {
      mutate(finalData);
    } else if (status === 'edit' && data) {
      editMutate({ id: data.id as string, ...finalData });
    }
  };

  return (
    <Dialog.Root open={isShowDialog} onOpenChange={() => onCloseModal(false)}>
      <Dialog.Content style={{ minWidth: '600px', position: 'relative' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={'column'} gap={'1'} dir='rtl'>
            <Dialog.Title style={{ color: '#3E63DD' }} {...typoVariant.h3}>
              {title ? title : 'افزودن پیام'}
            </Dialog.Title>
            <Flex direction={'column'} gap={'2'} pb={'4'}>
              <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                عنوان پیام
              </Text>
              <TextField.Input
                defaultValue={data?.title}
                size={'3'}
                placeholder='مثال : سالگرد تاسیس عود'
                {...register('title', {
                  required: {
                    message: 'لطفاً عنوان پیام را وارد کنید',
                    value: true,
                  },
                })}
              />
              {errors.title?.message && (
                <Text size={'2'} weight={'medium'} as='label' color='tomato' style={{ marginTop: 5 }}>
                  {errors.title.message}
                </Text>
              )}
            </Flex>
            <Flex direction={'column'} gap={'2'} pb={'4'}>
              <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                پیام شما
              </Text>
              <TextArea
                defaultValue={data?.description}
                size={'3'}
                placeholder='متن پیام شما'
                style={{ minHeight: 196 }}
                {...register('description', {
                  required: {
                    message: 'لطفاً پیام خود را بنویسید',
                    value: true,
                  },
                })}
              />
              {errors.description?.message && (
                <Text size={'2'} weight={'medium'} as='label' color='tomato' style={{ marginTop: 5 }}>
                  {errors.description.message}
                </Text>
              )}
            </Flex>

            {/* Start Date */}
            <Flex justify={'between'} align={'center'}>
              <Flex direction={'column'} gap={'2'} pb={'4'} style={{ width: '45%', position: 'relative' }}>
                <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                  ساعت شروع
                </Text>
                <TextField.Root>
                  <TextField.Input
                    defaultValue={
                      data && status === 'edit' && data?.startTime ? getTimeFromDate(data?.startTime) : ''
                    }
                    value={watch('startTime')}
                    size={'3'}
                    placeholder='مثال : ۳۰ : ۱۵'
                    {...register('startTime', {
                      required: {
                        message: 'لطفاً ساعت شروع را وارد کنید',
                        value: true,
                      },
                    })}
                  />
                  <TextField.Slot>
                    <ClockIcon />
                  </TextField.Slot>
                </TextField.Root>
                {errors.startTime?.message && (
                  <Text size={'2'} weight={'medium'} as='label' color='tomato' style={{ marginTop: 5 }}>
                    {errors.startTime?.message}
                  </Text>
                )}
                <DatePicker
                  onChange={(dateObject: DateObject | DateObject[] | any) => {
                    setValue('startTime', dateObject.format());
                  }}
                  disableDayPicker
                  format='HH:mm:ss'
                  plugins={[<TimePicker />]}
                />
              </Flex>
              {/* DatePicker */}
              <Flex direction={'column'} gap={'2'} pb={'4'} style={{ width: '45%', position: 'relative' }}>
                <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                  تاریخ شروع
                </Text>
                <TextField.Root>
                  <TextField.Input
                    defaultValue={data && status === 'edit' ? moment(data.start).format('jYYYY/jM/jD') : ''}
                    value={watch('startDate')}
                    size={'3'}
                    placeholder='مثال : ۱۴۰۱/۸/۲۴'
                    {...register('startDate', {
                      required: {
                        message: 'لطفاً تاریخ شروع را مشخص کنید',
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
                    {errors.startDate?.message}
                  </Text>
                )}
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  onChange={(dateObject: DateObject | DateObject[] | any) => {
                    setValue('startDate', dateObject.format());
                  }}
                />
              </Flex>
            </Flex>

            {/* End Date */}
            <Flex justify={'between'} align={'center'}>
              <Flex direction={'column'} gap={'2'} pb={'4'} style={{ width: '45%', position: 'relative' }}>
                <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                  ساعت پایان
                </Text>
                <TextField.Root>
                  <TextField.Input
                    defaultValue={
                      data && status === 'edit' && data?.endTime ? getTimeFromDate(data?.endTime) : ''
                    }
                    value={watch('endTime')}
                    size={'3'}
                    placeholder='مثال : ۳۰ : ۱۵'
                    {...register('endTime', {
                      required: {
                        message: 'لطفاً ساعت پایان را وارد کنید',
                        value: true,
                      },
                    })}
                  />
                  <TextField.Slot>
                    <ClockIcon />
                  </TextField.Slot>
                </TextField.Root>
                {errors.endTime?.message && (
                  <Text size={'2'} weight={'medium'} as='label' color='tomato' style={{ marginTop: 5 }}>
                    {errors.endTime?.message}
                  </Text>
                )}
                <DatePicker
                  onChange={(dateObject: DateObject | DateObject[] | any) => {
                    setValue('endTime', dateObject.format());
                  }}
                  disableDayPicker
                  format='HH:mm:ss'
                  plugins={[<TimePicker />]}
                />
              </Flex>
              {/* DatePicker */}
              <Flex direction={'column'} gap={'2'} pb={'4'} style={{ width: '45%', position: 'relative' }}>
                <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                  تاریخ پایان
                </Text>
                <TextField.Root>
                  <TextField.Input
                    defaultValue={data && status === 'edit' ? moment(data.end).format('jYYYY/jM/jD') : ''}
                    value={watch('endDate')}
                    size={'3'}
                    placeholder='مثال : ۱۴۰۱/۸/۲۴'
                    {...register('endDate', {
                      required: {
                        message: 'لطفاً تاریخ پایان را مشخص کنید',
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
                    {errors.endDate?.message}
                  </Text>
                )}
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  onChange={(dateObject: DateObject | DateObject[] | any) => {
                    setValue('endDate', dateObject.format());
                  }}
                />
              </Flex>
            </Flex>
            <Flex justify={'center'} gap={'6'} align={'center'}>
              <Button
                disabled={isLoading || editIsLoading}
                type='submit'
                color='amber'
                radius='large'
                size={'3'}
                style={{
                  cursor: 'pointer',
                  paddingInline: 40,
                  paddingBlock: 12,
                }}
              >
                <Text {...typoVariant.body2}>{status === 'create' ? 'ثبت' : 'ویرایش'}</Text>
              </Button>
              <Dialog.Close>
                <Button
                  variant='ghost'
                  size={'3'}
                  radius='large'
                  style={{
                    cursor: 'pointer',
                    paddingInline: 40,
                    paddingBlock: 12,
                  }}
                >
                  <Text style={{ color: '#646464' }} {...typoVariant.body2}>
                    بازگشت
                  </Text>
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FormManagement;
