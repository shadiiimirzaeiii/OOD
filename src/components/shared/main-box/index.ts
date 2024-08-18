import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';
import { Breakpoints } from '@/theme/breakpoints';

export const MainBox = styled(Flex)`
  width: 100%;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  @media (min-width: ${Breakpoints.md}) {
    box-shadow: -2px 4px 16px -4px rgba(18, 43, 76, 0.2);
  }
`;
