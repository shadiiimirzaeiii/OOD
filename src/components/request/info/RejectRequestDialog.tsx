'use client';

import React, { ReactNode, useState } from 'react';
import { Button, Dialog, Flex, Text, TextArea } from '@radix-ui/themes';
import { useResponse } from '@/libs/hooks/useResponse';
import { typoVariant } from '@/theme/typo-variants';

type Props = {
  id: string;
  draftType: 'ARTIST' | 'PLAYLIST';
  trigger: ReactNode;
};

const RejectRequestDialog = (props: Props) => {
  const { trigger } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const { mutate, isLoading } = useResponse();

  const onSubmit = () => {
    mutate({ id: props.id, message: text, draftType: props.draftType, status: false });
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content style={{ width: '400px', height: '300px' }}>
        <Flex direction={'column'} gap='6' style={{ height: '100%' }}>
          <Flex direction={'column'} gap='2'>
            <Text color='tomato'>پیام بازگرداندن درخواست</Text>
            <Text>آیا از بازگرداندن درخواست اطمینان دارید؟</Text>
          </Flex>

          <TextArea
            onChange={e => setText(e.target.value)}
            size={'3'}
            placeholder='متن پیام'
            style={{ fontSize: '12px' }}
          />

          <Flex gap='3' mt='3' justify='center'>
            <Button disabled={isLoading} onClick={onSubmit} type={'submit'} size={'3'}>
              <Text {...typoVariant.body2}>ثبت</Text>
            </Button>
            <Dialog.Close>
              <Button disabled={isLoading} type={'button'} size={'3'} variant={'outline'} color={'tomato'}>
                <Text color={'tomato'} {...typoVariant.body2}>
                  انصراف
                </Text>
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RejectRequestDialog;
