import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';
import { StatisticsTitleProps } from '@/types/dashboard.types';

export const StatisticsItemWrapper = styled(Flex)<{ title: StatisticsTitleProps }>`
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1.5px 2px 0px rgba(0, 0, 0, 0.13) inset;
  background-color: ${props =>
    props.title === 'وضعیت ربات'
      ? '#F8FAFF'
      : props.title === 'وضعیت آثار'
      ? '#FFF9ED)'
      : props.title === 'آمار کاربران'
      ? '#DDF3E4'
      : '#FFE5E5'};

  height: ${props =>
    props.title === 'وضعیت ربات'
      ? '98px'
      : props.title === 'وضعیت آثار'
      ? '62px'
      : props.title === 'آمار کاربران'
      ? '44px'
      : '44px'};
`;
