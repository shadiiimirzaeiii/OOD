'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { useParams } from 'next/navigation';
import { CameraIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Box, Button, Dialog, Flex, Heading, Text } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory, createSubCategory } from '@/apis/category';
import useUpload from '@/libs/hooks/useUpload';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import { CategoriesForm } from '@/types/categories';
import ImagePicker from '../../shared/image-picker/ImagePicker';

type Props = { type?: 'category' | 'subCategory' };

const CreateCategory = ({ type = 'category' }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: upload, isLoading: uploadLoading } = useUpload();
  const queryClient = useQueryClient();
  const params = useParams();

  const { mutate: submitCategory, isLoading } = useMutation({
    mutationFn: async (data: Omit<CategoriesForm, 'image'> & { image: string }) => {
      if (type === 'category') {
        return await createCategory(data);
      }
      return await createSubCategory({ ...data, id: params.slug as string });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: type === 'category' ? ['categories'] : ['subCategories'],
      });
      ToastSuccess('عملیات با موفقیت ثبت شد');
      setOpen(false);
      reset();
    },
    onError: () => ToastError('خطایی رخ داده است'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm<CategoriesForm>();

  const onSubmit: SubmitHandler<CategoriesForm> = async (data: CategoriesForm) => {
    upload(
      { image: data.image, path: 'category' },
      { onSuccess: image => submitCategory({ ...data, image }) }
    );
  };

  const clearErrorOnChange = (field: keyof CategoriesForm) => {
    if (errors[field]) return clearErrors(field);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Flex gap={'2'} align={'center'} width={'max-content'}>
          <Button size={'3'} style={{ width: 200, cursor: 'pointer', backgroundColor: '#3E63DD' }}>
            <PlusCircledIcon width={'16'} height={'16'} style={{ color: 'white' }} />
            <Text {...typoVariant.body2} style={{ color: 'white' }}>
              ساخت {type === 'subCategory' && 'زیر'} دسته بندی جدید
            </Text>
          </Button>
        </Flex>
      </Dialog.Trigger>

      <Dialog.Content style={{ width: '400px' }}>
        <Flex direction={'column'} gap={'6'}>
          <Heading {...typoVariant.h3} style={{ color: '#3E63DD' }}>
            اضافه کردن {type === 'subCategory' && 'زیر'} دسته بندی
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={'column'} gap={'6'}>
              <Flex style={{ alignSelf: 'center' }}>
                <ImagePicker
                  title={type === 'category' ? 'تصویر دسته بندی' : 'تصویر زیر دسته بندی'}
                  icon={<CameraIcon />}
                  onChange={image => {
                    setValue('image', image as File), clearErrorOnChange('image');
                  }}
                  style={{ width: 120, height: 120 }}
                />
              </Flex>
              <Flex direction={'column'} gap={'1'} style={{ height: '80px' }}>
                <Text mr={'4'} as='label' {...typoVariant.body2}>
                  نام {type === 'subCategory' && 'زیر'} دسته بندی
                </Text>

                <Input
                  size={'3'}
                  {...register('name', {
                    required: { message: 'لطفاً نام دسته بندی را وارد کنید', value: true },
                  })}
                  placeholder='مثال: دسته‌بندی ۱'
                  style={{ fontSize: '12px' }}
                />

                <Text as='span' mr={'1'} style={{ color: '#D93D42', fontSize: '10px' }}>
                  {errors.name?.message}
                </Text>
              </Flex>
              <Flex direction={'column'} gap={'1'} style={{ height: '80px' }}>
                <Text mr={'4'} as='label' {...typoVariant.body2}>
                  نام لاتین {type === 'subCategory' && 'زیر'} دسته بندی
                </Text>

                <Input
                  size={'3'}
                  {...register('latinName', {
                    required: { message: 'لطفاً نام لاتین دسته بندی را وارد کنید', value: true },
                  })}
                  placeholder='مثال: category 1'
                  style={{ fontSize: '12px' }}
                />

                <Text as='span' mr={'1'} style={{ color: '#D93D42', fontSize: '10px' }}>
                  {errors.latinName?.message}
                </Text>
              </Flex>
              <Flex gap={'4'} style={{ alignSelf: 'center' }} align={'center'}>
                <Button size={'3'} style={{ cursor: 'pointer' }} type='submit'>
                  <Text
                    {...typoVariant.body2}
                    style={{
                      paddingInline: 32,
                      paddingBlock: 12,
                      color: isLoading || uploadLoading ? 'transparent' : 'initial',
                    }}
                  >
                    ثبت
                  </Text>
                  {uploadLoading ||
                    (isLoading && (
                      <Box position={'absolute'}>
                        <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                      </Box>
                    ))}
                </Button>

                <Dialog.Close>
                  <Button
                    variant='ghost'
                    size={'3'}
                    style={{ backgroundColor: '#FCFCFC', cursor: 'pointer' }}
                  >
                    <Text
                      {...typoVariant.body2}
                      style={{ color: '#646464', paddingInline: 32, paddingBlock: 12 }}
                    >
                      بازگشت
                    </Text>
                  </Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateCategory;
