'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { usePathname, useRouter } from 'next/navigation';
import { CameraIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Select, Text } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { createUser, updateUser } from '@/apis/user';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import useUpload from '@/libs/hooks/useUpload';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import { UpdateUserBodyType, UserInfo } from '@/types/access-management';
import ImagePicker from '../../shared/image-picker/ImagePicker';
import { roles } from '../access-management.constant';

const ManageUserForm = (props: { roles: typeof roles; action: string; UserInfo?: UserInfo }) => {
  const router = useRouter();
  const path = usePathname();
  const { mutate: upload } = useUpload();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: UpdateUserBodyType) => {
      if (props.action === 'create') {
        return await createUser(data);
      } else {
        return await updateUser(props.UserInfo?.id as string, data);
      }
    },
    onSuccess: () => {
      ToastSuccess('عملیات با موفقیت ثبت شد');
      if (props.action === 'create') {
        router.push('/access');
      } else {
        window.location.pathname = path.replace('/edit/', '/info/');
      }
    },
    onError: (e: any) => ToastError(e.response.data.message ?? 'خطایی رخ داده است'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
    control,
  } = useForm<UserInfo>({
    defaultValues: {
      ...props.UserInfo,
      role: props.roles.find(role => role.lable === props.UserInfo?.role)?.value,
    },
  });

  const onSubmit: SubmitHandler<UserInfo> = ({ name, image, role, username, nationalCode }: UserInfo) => {
    upload(
      { image: image as unknown as File, path: 'authors' },
      { onSuccess: uploadedImage => mutate({ name, nationalCode, role, username, image: uploadedImage }) }
    );
  };

  const clearErrorOnChange = (field: keyof UserInfo) => {
    if (errors[field]) return clearErrors(field);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={'column'} align={'center'} justify={'between'} style={{ minHeight: '540px' }}>
        {/* inputs wrapper */}
        <Flex direction={'column'} gap={'6'} align={'center'}>
          <Flex style={{ alignSelf: 'center' }}>
            <ImagePicker
              title=''
              icon={<CameraIcon />}
              defaultImage={
                props.UserInfo?.image ? IMAGE_BASE_URL + props.UserInfo?.image : '/image/UserFallBack.jpg'
              }
              onChange={image => {
                setValue('image', image as unknown as string);
                clearErrorOnChange('image');
              }}
              style={{ borderRadius: '100%', width: '120px', height: '120px' }}
            />
          </Flex>
          <Flex gap={'6'}>
            <Flex direction={'column'} gap={'1'} pb={'4'}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                نام و نام خانوادگی
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال علی اصغری'
                style={{ minWidth: '275px' }}
                {...register('name', {
                  required: { message: 'نام و نام خانوادگی کاربر را وارد کنید', value: true },
                })}
                error={errors && errors.name?.message}
              />
            </Flex>
            <Flex direction={'column'} gap={'1'} pb={'4'}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                شماره تماس
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال ۰۹۱۲۰۰۰۰۰۰'
                style={{ minWidth: '275px' }}
                {...register('username', {
                  required: { message: 'شماره تماس کاربر را وارد کنید', value: true },
                })}
                error={errors && errors.username?.message}
              />
            </Flex>
          </Flex>
          <Flex gap={'6'}>
            <Flex direction={'column'} gap={'1'} pb={'4'}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                کد ملی
              </Text>
              <Input
                size={'3'}
                radius='medium'
                placeholder='مثال ۰۰۱۱۲۳۴۵۶۷۸'
                style={{ minWidth: '275px' }}
                {...register('nationalCode', {
                  required: { message: 'کد ملی کاربر را وارد کنید', value: true },
                })}
                error={errors && errors.nationalCode?.message}
              />
            </Flex>
            <Flex direction={'column'} gap={'1'} pb={'4'} style={{ minWidth: 275 }}>
              <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
                سطح دسترسی
              </Text>
              <Controller
                name='role'
                control={control}
                rules={{ required: { message: 'سطح دسترسی را انتخاب کنید', value: true } }}
                render={({ field }) => (
                  <Select.Root
                    {...field}
                    value={watch('role')}
                    onValueChange={value => setValue('role', value)}
                    size={'3'}
                  >
                    <Select.Trigger />
                    <Select.Content position='popper'>
                      {props.roles?.map(role => (
                        <Select.Item key={role.id} value={role.value.toString()}>
                          <Text {...typoVariant.body2} style={{ color: '--var(gray-gray-8)' }}>
                            {role.lable}
                          </Text>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              />

              <Text as='label' color='tomato'>
                {errors.role?.message as string}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* buttons wrapper */}
        <Flex width={'100%'} justify={'center'} gap={'6'} align={'center'}>
          <Button
            type='submit'
            size={'3'}
            style={{
              cursor: 'pointer',
              backgroundColor: '#3E63DD',
              color: 'white',
              paddingInline: '24px',
              paddingBlock: '12px',
            }}
          >
            <Text {...typoVariant.body2}>ثبت اطلاعات</Text>
            {isLoading && (
              <Box position={'absolute'}>
                <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
              </Box>
            )}
          </Button>
          <Button
            size={'3'}
            type='button'
            variant='outline'
            style={{ cursor: 'pointer', paddingInline: '24px', paddingBlock: '12px' }}
            onClick={() => router.back()}
          >
            <Text {...typoVariant.body2}>بازگشت</Text>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default ManageUserForm;
