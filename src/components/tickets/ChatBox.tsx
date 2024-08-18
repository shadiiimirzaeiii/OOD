'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Box, Flex, IconButton, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';
import ChatCard from './ChatCard';

const ChatBox = () => {
  const { reset, register, handleSubmit } = useForm({
    defaultValues: {
      text: '',
    },
  });

  return (
    <Box grow={'1'} position={'relative'} style={{ overflow: 'hidden' }}>
      <Flex
        py={'5'}
        px={'4'}
        gap={'3'}
        direction={'column'}
        style={{ height: 'calc(100% - 80px)', overflowY: 'auto' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Flex
            width={'max-content'}
            key={i}
            style={{ alignSelf: (i + 1) % 2 === 0 ? 'flex-end' : 'flex-start', maxWidth: '45%' }}
          >
            <ChatCard />
          </Flex>
        ))}
      </Flex>

      <Flex
        gap={'5'}
        pt={'5'}
        px={'5'}
        pb={'4'}
        position={'absolute'}
        width={'100%'}
        bottom={'0'}
        left={'0'}
        style={{ background: '#F9F9F9', borderRadius: '0 0 8px 8px' }}
        align={'center'}
      >
        <IconButton variant='ghost' size={'4'} style={{ flexShrink: 0 }}>
          <PaperPlaneIcon />
        </IconButton>

        <TextFieldRoot style={{ flexGrow: 1 }}>
          <TextFieldInput
            {...register('text', { required: true })}
            radius='medium'
            size={'3'}
            placeholder='پیام شما'
          />
        </TextFieldRoot>
      </Flex>
    </Box>
  );
};

export default ChatBox;
