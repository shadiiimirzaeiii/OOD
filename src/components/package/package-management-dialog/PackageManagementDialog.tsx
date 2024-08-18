'use client';

import { ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Dialog, Flex, Separator, Text } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { createPackage, updatePackage } from '@/apis/package';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import { PackageItem } from '@/types/package';
import { packageManagementFormSchema } from '@/validations/package';
import { PackageForm } from '../package-list/package-list.type';

type Props = {
  initialData?: PackageItem;
  trigger: ReactNode;
};

const PackageManagementDialog = (props: Props) => {
  const { initialData, trigger } = props;
  const [hasDiscount, setHasDiscount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const formMethods = useForm<PackageForm>({
    defaultValues: {
      name: initialData?.name,
      price: initialData?.price,
      duration: +(initialData?.duration || 0),
      ...(initialData?.discountPrice && { discountPrice: +initialData?.discountPrice }),
    },
    resolver: zodResolver(packageManagementFormSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
    getValues,
    reset,
  } = formMethods;

  const { mutate, isLoading } = useMutation(
    async (data: PackageForm) => {
      if (initialData?.id) {
        return await updatePackage(data, initialData.id);
      }
      return await createPackage(data);
    },
    {
      onSuccess: () => {
        toast.success(`پکیج با موفقیت ${initialData?.id ? 'ویرایش' : 'ساخته'} شد`);
        setIsOpen(false);
        router.refresh();
        reset();
      },
      onError: () => {
        toast.error('خطایی رخ داده است');
      },
    }
  );

  const onSubmit = () => {
    const data = getValues();
    mutate(data);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={e => setIsOpen(e)}>
      <FormProvider {...formMethods}>
        <Dialog.Trigger>{trigger}</Dialog.Trigger>
        <Dialog.Content style={{ paddingBlock: 32 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title mb={'5'} {...typoVariant.h3} color={'teal'}>
              ساخت پکیج
            </Dialog.Title>
            <Flex direction={'column'} gap={'5'}>
              <Input
                error={errors.name?.message?.toString()}
                {...register('name')}
                size={'3'}
                title={'نام پکیج'}
                placeholder={'مثال : پکیج نقره ای'}
              />
              <Input
                error={errors.duration?.message?.toString()}
                {...register('duration', {
                  valueAsNumber: true,
                })}
                type={'number'}
                size={'3'}
                title={'زمان پکیج'}
                placeholder={'مثال: 120'}
              />
              <Input
                error={errors.price?.message?.toString()}
                {...register('price', {
                  valueAsNumber: true,
                })}
                pattern={'[0-9]+([\\.|,][0-9]{1,2})?'}
                type={'number'}
                size={'3'}
                title={'قیمت پکیج'}
                placeholder={'مثال: 120.000'}
              />
              <Text as='label' size='2'>
                <Flex gap='2' wrap={'nowrap'} align={'center'}>
                  <Checkbox
                    checked={hasDiscount}
                    onCheckedChange={isChecked => {
                      setHasDiscount(!!isChecked);
                      !isChecked && setValue('discountPrice', 0);
                    }}
                    size={'3'}
                  />
                  <Text style={{ flexShrink: 0 }}>تخفیف دارد</Text>
                  <Separator mr={'2'} size={'4'} />
                </Flex>
              </Text>
              <Input
                max={watch('price')}
                type={'number'}
                {...register('discountPrice', {
                  valueAsNumber: true,
                })}
                disabled={!hasDiscount}
                size={'3'}
                title={'قیمت تخفیف'}
                placeholder={'مثال: 120.000'}
              />
              <Flex gap='3' mt='3' justify='center'>
                <Button disabled={isLoading} type={'submit'} size={'3'}>
                  {isLoading ? (
                    <Loading width={20} height={20} type='spin' color='#fff' />
                  ) : (
                    <Text {...typoVariant.body2}>ثبت</Text>
                  )}
                </Button>
                <Dialog.Close>
                  <Button
                    disabled={isLoading}
                    type={'button'}
                    size={'3'}
                    variant={'outline'}
                    color={'tomato'}
                  >
                    <Text color={'tomato'} {...typoVariant.body2}>
                      انصراف
                    </Text>
                  </Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </FormProvider>
    </Dialog.Root>
  );
};

export default PackageManagementDialog;
