'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { deletePackage } from '@/apis/package';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { typoVariant } from '@/theme/typo-variants';
import { PackageItem } from '@/types/package';

const DeletePackageDialog = (props: PackageItem) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { mutate, isLoading } = useMutation(() => deletePackage(props.id), {
    onSuccess: () => {
      toast.success(`پکیج با موفقیت حذف شد`);
      setIsOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error(`خطایی در حذف پکیج رخ داده است`);
    },
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={e => setIsOpen(e)}>
      <Dialog.Trigger>
        <IconButton variant={'ghost'}>
          <TrashIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title {...typoVariant.h3}>حذف پکیج</Dialog.Title>
        <Flex direction={'column'} gap={'5'}>
          <Text {...typoVariant.title1}>{props.name}</Text>
          <TitleDescription title={'مدت زمان پکیج'} description={`${props.duration} روز `} />
          <Flex gap={'5'}>
            <TitleDescription
              title={'قیمت پکیج'}
              description={`${props.price?.toLocaleString('ir-IR')} تومان `}
            />
            <TitleDescription
              title={'قیمت تخفیف'}
              description={props.discountPrice?.toLocaleString('ir-IR') || '-'}
            />
          </Flex>
          <Text {...typoVariant.h6} color={'tomato'}>
            {' '}
            آیا از حذف پکیج اطمینان دارید ؟
          </Text>
          <Flex justify={'center'} gap={'5'}>
            <Button onClick={() => mutate()} type={'button'} disabled={isLoading} size='3' color={'tomato'}>
              <Text {...typoVariant.body2}>حذف پکیج</Text>
            </Button>
            <Dialog.Close>
              <Button disabled={isLoading} size='3' type={'button'} variant={'outline'}>
                <Text {...typoVariant.body2}>بازگشت</Text>
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeletePackageDialog;
