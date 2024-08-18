import { ComponentProps, ReactNode } from 'react';
import { TextField } from '@radix-ui/themes';

export type InputProps = {
  error?: string;
  rightNode?: ReactNode;
  leftNode?: ReactNode;
  rootProps?: ComponentProps<typeof TextField.Root>;
  title?: string;
} & ComponentProps<typeof TextField.Input>;
