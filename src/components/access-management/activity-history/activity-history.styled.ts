import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';

export const ActivityStatus = styled(Flex)<{ status: string }>`
  border-radius: 24px;
  color: #838383;
  padding: 2px 8px;
  background-color: ${props =>
    props.status === 'approved'
      ? '#DDF3E4'
      : props.status === 'pending'
      ? '#D2F4FD'
      : props.status === 'rejected'
      ? '#FFE5E5'
      : '#fff'};
`;
