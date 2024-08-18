import { ComponentProps, ReactNode } from 'react';
import { Flex } from '@radix-ui/themes';

export type ImagePickerProps = {
  title: string;
  icon: ReactNode;
  onChange: (image: File) => void;
  defaultImage?: string;
  error?: string;
} & ComponentProps<typeof Flex>;
