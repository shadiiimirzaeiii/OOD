'use client';

import { forwardRef, useState } from 'react';
import { Box, Text, TextField } from '@radix-ui/themes';
import { useHover } from '@react-aria/interactions';
import { AnimatePresence, motion } from 'framer-motion';
import { Error, Root } from '@/libs/primitives/input/input.styled';
import { typoVariant } from '@/theme/typo-variants';
import { InputProps } from './input.type';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { rootProps, title, error, rightNode, leftNode, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  const { isHovered, hoverProps } = useHover({
    isDisabled: error === undefined,
  });

  const animateVariant = {
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  };

  return (
    <Box position={'relative'} {...hoverProps}>
      {title && (
        <Box pr={'4'} mb={'1'}>
          <Text {...typoVariant.body1}>{title}</Text>
        </Box>
      )}
      <AnimatePresence>
        {(isHovered || isFocused) && (
          <Error asChild {...typoVariant.body3} color={'tomato'}>
            <motion.span
              transition={{ duration: 0.2 }}
              variants={animateVariant}
              initial='close'
              animate='open'
              exit='close'
            >
              {error}
            </motion.span>
          </Error>
        )}
      </AnimatePresence>
      <Root hasError={!!error} {...rootProps}>
        {rightNode && <TextField.Slot>{rightNode}</TextField.Slot>}
        <TextField.Input
          color={error ? 'tomato' : undefined}
          ref={ref}
          {...rest}
          onFocus={e => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          style={{
            ...(rest.type === 'number' && { paddingLeft: 16 }),
            ...rest.style,
          }}
        />
        {leftNode && <TextField.Slot>{leftNode}</TextField.Slot>}
      </Root>
    </Box>
  );
});
