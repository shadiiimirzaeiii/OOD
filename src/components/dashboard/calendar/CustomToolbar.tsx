'use client';

import React, { useState } from 'react';
import { PlusCircledIcon, TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { css, styled } from 'styled-components';
import { ROLE } from '@/constants/routes';
import AccessGate from '@/libs/providers/AccessGate';
import { typoVariant } from '@/theme/typo-variants';
import FormManagement from './FormManagement';

type CustomToolbarProps = {
  onGoToDayView: () => void;
  onGoToMonthView: () => void;
  onGoToNext: () => void;
  onGoToPrevious: () => void;
  currentDate: {
    dayNumber: number;
    dayString: string;
    month: string;
    year: string;
  };
  currentView: string;
};

const CustomToolbar = ({
  onGoToDayView,
  onGoToMonthView,
  onGoToNext,
  onGoToPrevious,
  currentView,
  currentDate,
}: CustomToolbarProps) => {
  const [isShowFormManagement, setIsShowFormManagement] = useState(false);

  const hanleCloseModal = (value: boolean) => setIsShowFormManagement(value);
  return (
    <Flex justify={'between'} align={'center'} pb={'3'} style={{ overflowX: 'hidden' }}>
      <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
        <Button
          variant='outline'
          size={'3'}
          radius='large'
          style={{ cursor: 'pointer', boxShadow: 'inset 0 0 0 1px #3451B2', color: '#3451B2' }}
          onClick={() => setIsShowFormManagement(true)}
        >
          <PlusCircledIcon
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text {...typoVariant.body2}>افزودن پیام</Text>
        </Button>
      </AccessGate>
      <div></div>
      {isShowFormManagement && (
        <FormManagement status='create' isShowDialog={isShowFormManagement} onCloseModal={hanleCloseModal} />
      )}
      <Flex align={'center'} justify={'center'} gap={'4'} style={{ width: 330 }}>
        <MonthButton onClick={onGoToMonthView} radius='large' size={'3'} currentView={currentView}>
          <Text {...typoVariant.body2}>ماهانه</Text>
        </MonthButton>
        <DayButton currentView={currentView} onClick={onGoToDayView}>
          <Text {...typoVariant.body2}>روزانه</Text>
        </DayButton>
      </Flex>
      <Flex gap={'4'} align={'center'}>
        <Button onClick={onGoToPrevious} variant='ghost'>
          <TriangleRightIcon style={{ width: 20, height: 20, cursor: 'pointer' }} />
        </Button>
        {currentView === 'month' ? (
          <Flex gap={'1'}>
            <Text {...typoVariant.title1} style={{ textAlign: 'center' }}>
              {currentDate.month}
            </Text>
            <Text {...typoVariant.title1}>{currentDate.year}</Text>
          </Flex>
        ) : (
          <Flex direction={'column'} justify={'center'}>
            <Text style={{ textAlign: 'center' }}> {currentDate.dayString}</Text>
            <Flex gap={'1'}>
              <Text style={{ textAlign: 'center' }}>{currentDate.dayNumber}</Text>
              <Text style={{ textAlign: 'center' }}>{currentDate.month}</Text>
            </Flex>
          </Flex>
        )}

        <Button onClick={onGoToNext} variant='ghost'>
          <TriangleLeftIcon style={{ width: 20, height: 20, cursor: 'pointer' }} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default CustomToolbar;

const MonthButton = styled(Button)<{ currentView: string }>`
  cursor: pointer;
  padding: 4px 50px;
  background-color: #fff3d0;
  color: #915930;
  &:hover {
    background-color: #fff3d0;
    transition: 100ms all linear;
  }

  ${({ currentView }) =>
    currentView === 'month'
      ? css`
          background-color: #fff3d0;
        `
      : css`
          background-color: inherit;
          color: #646464;
        `};
`;

const DayButton = styled(Button)<{ currentView: string }>`
  cursor: pointer;
  padding: 19px 50px;
  background-color: #fff3d0;
  color: #915930;
  &:hover {
    background-color: #fff3d0;
    transition: 100ms all linear;
  }

  ${({ currentView }) =>
    currentView === 'day'
      ? css`
          background-color: #fff3d0;
        `
      : css`
          background-color: inherit;
          color: #646464;
        `};
`;
