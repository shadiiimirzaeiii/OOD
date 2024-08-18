import React, { ChangeEvent } from 'react';
import { Button, DropdownMenu, Flex, Text, TextField } from '@radix-ui/themes';
import { ArtistListSortOptions } from '@/constants/artist-sort';
import useDebounce from '@/libs/hooks/useDebounce';
import { ArrowDown, Search } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import { SearchFilterProps } from '@/types/categories';

type Props = SearchFilterProps;

const Header = (props: Props) => {
  const { sort, setSort, setSearch } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useDebounce(handleChange);

  return (
    <Flex gap={'4'} direction={'row-reverse'} justify={'end'}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant='outline' size={'3'} style={{}}>
            <Text color={'gray'} {...typoVariant.body2}>
              {sort.label}
            </Text>
            <ArrowDown />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {ArtistListSortOptions.map(option => (
            <DropdownMenu.Item key={option.value} onSelect={() => setSort(option)}>
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <TextField.Root style={{ minWidth: 500 }}>
        <TextField.Slot>
          <Search />
        </TextField.Slot>
        <TextField.Input size={'3'} placeholder='جستجو نام اثر' onChange={debouncedResults} />
      </TextField.Root>
    </Flex>
  );
};

export default Header;
