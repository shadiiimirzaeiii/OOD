'use client';

import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import moment from 'moment-jalaali';
import styled from 'styled-components';
import { EventInfo } from '@/apis/event';
import { getTimeFromDate } from '@/libs/methods/time-from-date';
import { Edit } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import FormManagement from './FormManagement';
import RemoveMessage from './RemoveMessage';

type Props = {
  data: EventInfo;
  open: boolean;
  onCloseModal?: ((value: boolean) => void) | undefined;
};

const Message = ({ data, open, onCloseModal }: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowRemoveMessage, setIsShowRemoveMessage] = useState<boolean>(false);

  const hanldeCloseModal = (value: boolean) => {
    setIsShowModal(value);
    setIsShowRemoveMessage(value);
  };
  return (
    <Dialog.Root open={open} onOpenChange={() => onCloseModal && onCloseModal(false)}>
      <Dialog.Content style={{ backgroundColor: '#FFF9ED' }}>
        {isShowModal && (
          <FormManagement
            title='ویرایش پیام'
            status='edit'
            data={data}
            isShowDialog={isShowModal}
            onCloseModal={hanldeCloseModal}
          />
        )}

        {isShowRemoveMessage && (
          <RemoveMessage
            open={isShowRemoveMessage}
            onCloseModal={hanldeCloseModal}
            event={{ id: data.id, title: data.title }}
          />
        )}
        <Flex gap={'5'} direction={'column'}>
          <Flex gap={'4'} align={'center'}>
            <Text {...typoVariant.h3} style={{ color: '#646464' }}>
              {data.title}
            </Text>
            <EditIocnStyle cursor={'pointer'} onClick={() => setIsShowModal(true)} />
            <TrashIconStyle cursor={'pointer'} onClick={() => setIsShowRemoveMessage(true)} />
          </Flex>
          <Flex>
            <Flex justify={'between'} style={{ width: '60%' }}>
              <Flex gap={'2'}>
                <ClockIcon color='#BBBBBB' />
                <Text {...typoVariant.body2} style={{ color: '#BBBBBB' }}>
                  {getTimeFromDate(data?.start)}
                </Text>
              </Flex>
              <Flex gap={'2'}>
                <CalendarIcon color='#BBBBBB' />
                <Text {...typoVariant.body2} style={{ color: '#BBBBBB' }}>
                  {moment(data.start).format('jYYYY/jM/jD')}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Text {...typoVariant.paragraph1} style={{ color: '#646464' }}>
            {data.description}
          </Text>
          <Flex justify={'center'} gap={'3'}>
            <Button style={{ minWidth: '100px', height: '40px', cursor: 'pointer' }}>
              <Text {...typoVariant.body2} style={{ color: '#202020' }}>
                ثبت
              </Text>
            </Button>
            <Button
              variant='outline'
              onClick={() => onCloseModal && onCloseModal(false)}
              style={{ minWidth: '100px', height: '40px', cursor: 'pointer' }}
            >
              <Text {...typoVariant.body2} style={{ color: '#202020' }}>
                بازگشت
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Message;

const EditIocnStyle = styled(Edit)`
  path {
    fill: #000;
  }
`;

const TrashIconStyle = styled(TrashIcon)`
  path {
    fill: #d93d42;
  }
`;
