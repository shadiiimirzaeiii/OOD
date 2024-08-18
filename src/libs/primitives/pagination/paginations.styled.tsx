import { IconButton } from '@radix-ui/themes';
import { css, styled } from 'styled-components';

export const ChangePageIcon = styled(IconButton)`
  box-shadow: none;
  border: 1px solid var(--gray-7);
`;

export const Page = styled(IconButton)<{ isCurrentPage: boolean }>`
  color: var(--gray-12);
  ${({ isCurrentPage }) =>
    !isCurrentPage &&
    css`
      box-shadow: none;
    `}
`;
