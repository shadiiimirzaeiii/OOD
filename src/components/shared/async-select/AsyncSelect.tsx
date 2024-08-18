'use client';

import { forwardRef, MutableRefObject, ReactElement, RefAttributes } from 'react';
import { GroupBase, SelectInstance, StylesConfig } from 'react-select';
import { default as Select } from 'react-select/async';

/* eslint-disable */
// @ts-ignore
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import { Flex, Text } from '@radix-ui/themes';
import { debounce } from 'lodash';
import { styled } from 'styled-components';
import { cssVar } from '@/libs/methods/cssVar';
import { ArrowDown } from '@/public/icon';

type AsyncProps = {
  error?: boolean;
  loadOptions: (query: string) => void;
  isCreatable?: boolean;
  label?: string;
  cacheOptions?: boolean;
  loadOptionsImmediately?: boolean;
};

type Props = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: StateManagerProps<Option, IsMulti, Group> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>> & {
      immutableStyle?: StylesConfig<Option, IsMulti, Group>;
    } & AsyncProps
) => ReactElement;

type SelectType = {
  value: string;
  label: string;
};

export const AsyncSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: StateManagerProps<Option, IsMulti, Group> & {
      immutableStyle?: StylesConfig<Option, IsMulti, Group>;
    } & AsyncProps,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null
  ) => {
    const {
      isMulti,
      immutableStyle,
      loadOptions,
      placeholder = 'انتخاب...',
      cacheOptions = true,
      loadOptionsImmediately = false,
      ...rest
    } = props;

    const { id } = rest;

    const debouncedFunction = debounce(async (val, callBack) => {
      const result = await loadOptions(val);
      callBack(result);
    }, 500);

    const handleLoadOptions = (val: string) =>
      new Promise<any>(resolve => debouncedFunction(val, (result: SelectType[]) => resolve(result)));

    return (
      <Root>
        <Select
          {...rest}
          ref={ref}
          inputId={id}
          cacheOptions={cacheOptions}
          loadOptions={handleLoadOptions}
          noOptionsMessage={() => 'موردی وجود ندارد.'}
          defaultOptions={loadOptionsImmediately}
          components={{
            DropdownIndicator: () => <ArrowDown />,
            IndicatorSeparator: () => null,
            ClearIndicator: () => null,
            LoadingIndicator: () => null,
            LoadingMessage: () => (
              <Flex p={'5'} justify={'center'}>
                <Text align={'center'}>در حال بارگذاری...</Text>
              </Flex>
            ),
          }}
          placeholder={placeholder}
          isMulti={isMulti}
          styles={{
            control: (provided, state) => ({
              ...provided,
              height: '40px',
              borderRadius: '8px',
              boxShadow: state.isFocused ? `0 0 0 1px ${cssVar('--amber-8')}` : 'none',
              borderColor: state.isFocused ? cssVar('--amber-8') : cssVar('--gray-7'),
              '&:hover': {
                borderColor: !state.isFocused && cssVar('--gray-10'),
              },
              paddingLeft: '16px',
            }),
            menu: provided => ({
              ...provided,
              borderRadius: '12px',
              boxShadow: `0 0 0 1px ${cssVar('--gray-7')}`,
              border: 'none',
              marginTop: '8px',
              overflow: 'hidden',
            }),
            menuList: provided => ({
              ...provided,
              padding: '0',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? cssVar('--amber-4') : 'transparent',
              color: cssVar('--gray-12'),
              '&:hover': {
                backgroundColor: !state.isSelected && cssVar('--amber-2'),
              },
            }),
          }}
        />
      </Root>
    );
  }
) as Props;

const Root = styled.div`
  position: relative;
  width: 100%;
`;
