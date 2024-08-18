import { Flex } from '@radix-ui/themes';
import { styled } from 'styled-components';
import { Edit } from '@/public/icon';

export const Card = styled(Flex)`
  border: 1px solid var(--gray-4);
  border-radius: 12px;
  padding: 16px;
`;

export const StyledEdit = styled(Edit)`
  path {
    fill: var(--teal-10);
  }
`;
