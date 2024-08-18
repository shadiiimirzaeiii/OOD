import React from 'react';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvent } from '@/apis/event';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import { typoVariant } from '@/theme/typo-variants';

type props = {
  open: boolean;
  onCloseModal: (value: boolean) => void;
  event: { title: string; id: string };
};

const RemoveMessage = ({ open, onCloseModal, event }: props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      ToastSuccess('پیام با موفقیت حذف شد');
      onCloseModal(false);
    },
    onError: () => ToastError('خطا در حذف پیام'),
  });

  const onSubmit = () => mutate();

  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        <Dialog.Title {...typoVariant.h3} style={{ color: '#D93D42' }}>
          حذف پیام
        </Dialog.Title>
        <Dialog.Description style={{ color: '#646464' }} {...typoVariant.body1}>
          {` آیا از حذف پیام ${event.title} اطمینان دارید؟`}
        </Dialog.Description>
        <Flex mt={'5'} gap={'2'} justify={'center'}>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            size={'3'}
            style={{ paddingInline: '30px', cursor: 'pointer' }}
          >
            <Text {...typoVariant.body2} style={{ color: '#646464' }}>
              تایید
            </Text>
          </Button>
          <Button
            size={'3'}
            style={{ paddingInline: '30px', backgroundColor: 'inherit' }}
            onClick={() => onCloseModal(false)}
          >
            <Text {...typoVariant.body2} style={{ color: '#646464', cursor: 'pointer' }}>
              انصراف
            </Text>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RemoveMessage;
