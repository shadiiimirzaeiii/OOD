import { Flex } from '@radix-ui/themes';
import { styled } from 'styled-components';
import { ScrollbarStyles } from '@/libs/primitives/scrollbar/scrollbar.styled';
import { Breakpoints } from '@/theme/breakpoints';

export const MainBox = styled(Flex)`
  border-radius: 16px;
  @media (min-width: ${Breakpoints.md}) {
    height: 100%;
    overflow: hidden;
    box-shadow: -2px 4px 16px -4px rgba(18, 43, 76, 0.2);
  }
`;

export const RequestCardsWrapper = styled(Flex)`
  @media (min-width: ${Breakpoints.md}) {
    ${ScrollbarStyles}
  }
`;

export const ScrollWrapper = styled(Flex)`
  @media (min-width: ${Breakpoints.md}) {
    height: calc(100vh - 186px);
  }
`;
