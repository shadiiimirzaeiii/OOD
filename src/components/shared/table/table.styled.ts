import { Table as RadixTable, TableRoot as RadixTableRoot } from '@radix-ui/themes';
import { styled } from 'styled-components';
import { ScrollbarStyles } from '@/libs/primitives/scrollbar/scrollbar.styled';

export const StyledHeader = styled(RadixTable.Header)`
  --table-row-background-color: transparent;
`;

export const CenterWrapper = styled.div`
  width: 100%;
  display: grid;
  height: 100%;
  place-content: center;
`;

export const Root = styled(RadixTableRoot)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  max-height: 100%;
  width: 100%;
  overflow: auto;
  scrollbar-gutter: both-edges;
  ${ScrollbarStyles};
`;

export const ActiveBadge = styled.div<{
  $isActive?: boolean;
}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 0px solid transparent;
  border-bottom: 15px solid transparent;

  border-right: 15px solid ${({ $isActive }) => ($isActive ? 'var(--teal-9)' : 'var(--tomato-9)')};
`;
