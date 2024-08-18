'use client';

import { Text } from '@radix-ui/themes';
import { styled } from 'styled-components';

export const EllipsisText = styled(Text)<{ $lineNumber: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $lineNumber }) => $lineNumber};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
