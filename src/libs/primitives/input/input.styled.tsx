import { Text, TextField } from '@radix-ui/themes';
import { css, styled } from 'styled-components';

export const Error = styled(Text)`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  backdrop-filter: blur(3px);
  padding: 4px 8px;
  border-radius: 8px;
`;

export const Root = styled(TextField.Root)<{ hasError: boolean }>`
  input {
    ${({ hasError }) =>
      hasError &&
      css`
        outline: 2px solid var(--tomato-8);
        outline-offset: -1px;
      `}
  }
`;
