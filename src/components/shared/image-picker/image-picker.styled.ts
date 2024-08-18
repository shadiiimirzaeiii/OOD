import { Flex, IconButton } from '@radix-ui/themes';
import { css, styled } from 'styled-components';

export const DropBox = styled(Flex)<{ $hasImage: boolean; $hasError: boolean }>`
  position: relative;
  cursor: pointer;
  border: 2px dashed var(--teal-8);
  border-radius: var(--radius-4);
  width: 186px;
  height: 186px;
  overflow: hidden;

  img {
    transition: all 0.2s ease-in-out;
    user-select: none;
  }

  ${({ $hasImage }) =>
    $hasImage &&
    css`
      border: 2px dashed var(--teal-4);

      &:hover {
        img {
          filter: blur(2px);
        }
      }
    `}

  ${({ $hasError }) =>
    $hasError &&
    css`
      border: 2px dashed var(--tomato-8);
      * {
        fill: var(--tomato-10);
        color: var(--tomato-10);
      }
    `}
`;

export const StyledIconButton = styled(IconButton)`
  transition: all 0.2s ease-in-out;
  background-color: var(--teal-6);
  opacity: 0;

  ${DropBox}:hover & {
    opacity: 1;
  }
`;
