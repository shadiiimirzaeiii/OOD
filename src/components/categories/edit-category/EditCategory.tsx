'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { CameraIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory, deleteSubCategory, editCategory, editSubCategory } from '@/apis/category';
import ImagePicker from '@/components/shared/image-picker/ImagePicker';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import useUpload from '@/libs/hooks/useUpload';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import { CategoriesForm, CategoriesListByMode } from '@/types/categories';

type EditCategoyProps = CategoriesListByMode & { type?: 'category' | 'subCategory' };

const EditCategory = (props: EditCategoyProps) => {
  const { name, image, latinName, id, type = 'category' } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: upload, isLoading: uploadLoading } = useUpload();
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isLoading } = useMutation({
    mutationFn: async (data: Omit<CategoriesForm, 'image'> & { image: string }) => {
      if (type === 'category') {
        return await editCategory({ ...data, id });
      }
      return await editSubCategory({ ...data, id });
    },
    onSuccess: async () => {
      ToastSuccess('عملیات با موفقیت ثبت شد');
      setDialogOpen(false);
    },
    onError: () => ToastError('خطایی رخ داده است'),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: type === 'category' ? ['categories'] : ['subCategories'],
      });
    },
  });

  const { mutate: removeCategory, isLoading: deleteLoading } = useMutation({
    mutationFn: async () => {
      if (type === 'category') {
        return await deleteCategory(id);
      }
      return await deleteSubCategory(id);
    },
    onSuccess: async () => {
      ToastSuccess(`${type === 'subCategory' && 'زیر'} دسته بندی با موفقیت حذف شد`);
      setDialogOpen(false);
    },
    onError: () => ToastError('خطایی رخ داده است'),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: type === 'category' ? ['categories'] : ['subCategories'],
      });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<CategoriesForm>({
    defaultValues: {
      name,
      latinName,
    },
  });

  const handleEdit = (data: CategoriesForm) => {
    upload(
      { image: data.image, path: 'category' },
      { onSuccess: image => updateCategory({ ...data, image }) }
    );
  };

  const clearErrorOnChange = (field: keyof CategoriesForm) => {
    if (errors[field]) return clearErrors(field);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <IconButton variant='ghost' color='blue' size={'1'} style={{ cursor: 'pointer' }}>
          <Pencil2Icon style={{ width: 16, height: 16 }} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: '400px', padding: '16px' }}>
        <form onSubmit={handleSubmit(handleEdit)}>
          <Flex direction={'column'} gap={'6'}>
            <Text {...typoVariant.h3} style={{ color: '#3E63DD' }}>
              ویرایش {type === 'subCategory' && 'زیر'} دسته بندی
            </Text>
            <Flex style={{ alignSelf: 'center' }}>
              <ImagePicker
                defaultImage={IMAGE_BASE_URL + image}
                title='تصویر لیست پخش'
                icon={<CameraIcon />}
                onChange={image => {
                  setValue('image', image as File);
                  clearErrorOnChange('image');
                }}
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
              <Text as='label' mr={'1'} style={{ color: '#D93D42', fontSize: '10px' }}>
                {errors.image?.message}
              </Text>
            </Flex>
            <Flex direction={'column'} gap={'1'} style={{ height: '80px' }}>
              <Text as='label' mr={'4'} {...typoVariant.body2}>
                نام {type === 'subCategory' && 'زیر'} دسته بندی
              </Text>
              <Input
                size={'3'}
                {...register('name', {
                  required: { message: 'لطفاً برای دسته بندی عنوان انتخاب کنید', value: true },
                })}
                style={{ fontSize: '12px' }}
                placeholder='دسته‌بندی ۱'
              />
              <Text as='span' mr={'1'} mt={'2'} style={{ color: '#D93D42', fontSize: '10px' }}>
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
                  required: {
                    message: `لطفاً نام لاتین ${type === 'subCategory' && 'زیر'} دسته بندی را وارد کنید`,
                    value: true,
                  },
                })}
                placeholder='مثال: category 1'
                style={{ fontSize: '12px' }}
              />

              <Text as='span' mr={'1'} style={{ color: '#D93D42', fontSize: '10px' }}>
                {errors.latinName?.message}
              </Text>
            </Flex>
            <Flex direction={'column'} gap={'4'} style={{ width: '216px', alignSelf: 'center' }}>
              {/* warning for delete category */}
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button color='tomato' variant='soft' size={'4'} style={{ height: 40, cursor: 'pointer' }}>
                    <Text {...typoVariant.body2} style={{ color: '#D93D42' }}>
                      حذف {type === 'subCategory' && 'زیر'} دسته بندی
                    </Text>
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content style={{ maxWidth: '400px', padding: '16px' }}>
                  <Flex direction={'column'} gap={'6'}>
                    <Text as='span' {...typoVariant.h3} style={{ color: '#D93D42' }}>
                      حذف {type === 'subCategory' && 'زیر'} دسته بندی
                    </Text>
                    <Dialog.Description style={{ fontSize: '14px', color: '#646464' }}>
                      <Text as={'span'}>
                        آیا از حذف {type === 'subCategory' && 'زیر'} دسته بندی “{name}” اطمینان دارید؟
                      </Text>
                    </Dialog.Description>
                    {type === 'category' && (
                      <Flex gap={'2'}>
                        <Text {...typoVariant.body2} style={{ color: '#8D8D8D' }}>
                          تعداد زیر دسته بندی ها
                        </Text>
                        <Text as='span' {...typoVariant.body2} style={{ color: '#D93D42' }}>
                          {/* TODO: define array length for subCategory numbers */}
                          {`${''}`}
                        </Text>
                      </Flex>
                    )}
                    <Flex gap={'4'} style={{ alignSelf: 'center' }}>
                      <Button
                        type='submit'
                        size={'3'}
                        style={{ width: '100px', height: '40px', cursor: 'pointer' }}
                        onClick={() => removeCategory()}
                      >
                        <Text
                          style={{ color: deleteLoading ? 'transparent' : 'initial' }}
                          {...typoVariant.body2}
                        >
                          تایید
                        </Text>
                        {deleteLoading && (
                          <Box position={'absolute'}>
                            <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                          </Box>
                        )}
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
                </Dialog.Content>
              </Dialog.Root>
              <Flex justify={'between'}>
                <Button size={'3'} style={{ cursor: 'pointer', width: 100, height: 40 }} type='submit'>
                  {isLoading ||
                    (uploadLoading && (
                      <Box position={'absolute'}>
                        <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                      </Box>
                    ))}
                  <Text
                    {...typoVariant.body2}
                    style={{ color: isLoading || uploadLoading ? 'transparent' : 'initial' }}
                  >
                    ثبت
                  </Text>
                </Button>

                <Dialog.Close>
                  <Button
                    variant='ghost'
                    size={'3'}
                    style={{ backgroundColor: '#FCFCFC', cursor: 'pointer', width: 100, height: 40 }}
                  >
                    <Text {...typoVariant.body2} style={{ color: '#646464' }}>
                      بازگشت
                    </Text>
                  </Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditCategory;
