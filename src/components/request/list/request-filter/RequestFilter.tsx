'use client';

import { ChangeEvent, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MixerVerticalIcon } from '@radix-ui/react-icons';
import { Button, Checkbox, DropdownMenu, Flex, IconButton, Popover, Text, TextField } from '@radix-ui/themes';
import useDebounce from '@/libs/hooks/useDebounce';
import { ArrowDown, Search } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import { requestListFilter, RequestListSortOptions } from '../request.constants';

const RequestFilter = () => {
  const { watch, setValue } = useFormContext();

  const foundSort = useMemo(() => {
    return RequestListSortOptions.find(option => option.value === watch('sort'));
  }, [watch('sort')]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('search', e.target.value);
  };

  const debouncedResults = useDebounce(handleChange);

  return (
    <Flex align={'center'} justify={'between'} gap={'5'}>
      <Flex align={'center'} gap={'5'} grow={'1'}>
        <Popover.Root>
          <Popover.Trigger>
            <IconButton type={'button'} variant={'ghost'}>
              <MixerVerticalIcon />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content>
            <Flex direction='column' gap='4'>
              {requestListFilter.map(({ label, value }) => (
                <Text {...typoVariant.body2} key={value} as='label'>
                  <Flex gap='3'>
                    <Controller
                      render={({ field }) => (
                        <Checkbox
                          size='3'
                          value={value}
                          checked={field.value.includes(value)}
                          onCheckedChange={isChecked => {
                            if (isChecked) {
                              field.onChange([...field.value, value]);
                            } else {
                              field.onChange(field.value.filter((e: string) => e !== value));
                            }
                          }}
                        />
                      )}
                      name={'filters'}
                    />
                    {label}
                  </Flex>
                </Text>
              ))}
            </Flex>
          </Popover.Content>
        </Popover.Root>

        <TextField.Root style={{ minWidth: 560, flexGrow: 1 }}>
          <TextField.Slot>
            <Search />
          </TextField.Slot>
          <TextField.Input onChange={debouncedResults} size={'3'} placeholder='متن شما' />
        </TextField.Root>
      </Flex>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant='outline' size={'3'} style={{ justifyContent: 'space-between', flex: '0 1 auto' }}>
            <Text color={'gray'} style={{ minWidth: 132 }} {...typoVariant.body2}>
              {foundSort?.label || 'مرتب سازی'}
            </Text>
            <ArrowDown />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {RequestListSortOptions.map(option => (
            <DropdownMenu.Item onSelect={() => setValue('sort', option.value)} key={option.value}>
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default RequestFilter;
