import { Flex } from '@radix-ui/themes';
import { styled } from 'styled-components';

export const AddBox = styled(Flex)`
  border: 2px dashed var(--teal-10);
  border-radius: 12px;
  width: 100%;
  height: 100%;
  min-height: 236px;
  cursor: pointer;
  * path {
    fill: var(--teal-10);
  }
`;
