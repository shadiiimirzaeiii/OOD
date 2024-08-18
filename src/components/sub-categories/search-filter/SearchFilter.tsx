'use client';

import { ChangeEvent } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Flex, Text, TextField } from '@radix-ui/themes';
import useDebounce from '@/libs/hooks/useDebounce';
import { typoVariant } from '@/theme/typo-variants';
import { SearchFilterProps } from '@/types/categories';
import { SearchFilterConstant } from './search-filter.constant';

const SearchFilter = (props: SearchFilterProps) => {
  const { sort, setSort, setSearch } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useDebounce(handleChange);

  return (
    <Flex gap={'5'} width={'100%'}>
      <TextField.Root size={'3'} style={{ width: '70%' }}>
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Input
          placeholder='جستجوی دسته بندی'
          radius='medium'
          onChange={debouncedResults}
          style={{ fontSize: '12px' }}
        />
      </TextField.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            size={'3'}
            variant='outline'
            color='gray'
            style={{
              padding: '4px 16px',
              cursor: 'pointer',
              justifyContent: 'space-between',
            }}
          >
            <Text {...typoVariant.body1} style={{ color: '#BBBBBB' }}>
              {sort && sort.label}
            </Text>
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content style={{ width: 175 }}>
          {SearchFilterConstant.map(option => (
            <DropdownMenu.Item key={option.value} onSelect={() => setSort(option)}>
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default SearchFilter;
