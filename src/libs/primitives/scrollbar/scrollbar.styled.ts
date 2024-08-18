'use client';

import { css } from 'styled-components';

export const ScrollbarStyles = css`
  --scrollbar-radius: 8px;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: var(--scrollbar-radius);
  }
  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: var(--scrollbar-radius);

    background: var(--gray-4);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: var(--scrollbar-radius);
    background: var(--teal-9);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--teal-11);
  }
`;
