'use client';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const modeAtom = atomWithStorage<number>(
  'mode',
  localStorage?.getItem('mode') ? Number(localStorage?.getItem('mode')) : 1
);

export const modeLoading = atom(false);
