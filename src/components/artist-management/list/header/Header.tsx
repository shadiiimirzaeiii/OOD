'use client';

import { ChangeEvent } from 'react';
import Link from 'next/link';
import { Button, DropdownMenu, Flex, Text, TextField } from '@radix-ui/themes';
import { ArtistListSortOptions } from '@/constants/artist-sort';
import useDebounce from '@/libs/hooks/useDebounce';
import { ArrowDown, PlusCircled, Search } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import { ListHeaderProps } from './header.type';

export default function Header(props: ListHeaderProps) {
  const { sort, setSort, setSearch } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useDebounce(handleChange);

  return (
    <Flex gap={'5'} align={'center'} wrap={'wrap'}>
      <Flex gap={'5'} width={{ initial: '100%' }}>
        <Button asChild size={'3'} color='blue'>
          <Link href={`/artist/create`}>
            <PlusCircled />
            <Text style={{ whiteSpace: 'nowrap' }} {...typoVariant.body2}>
              ساخت هنرمند جدید
            </Text>
          </Link>
        </Button>
        <TextField.Root style={{ flexGrow: 1 }}>
          <TextField.Slot>
            <Search />
          </TextField.Slot>
          <TextField.Input size={'3'} placeholder='متن شما' onChange={debouncedResults} />
        </TextField.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant='outline'
              size={'3'}
              style={{ justifyContent: 'space-between', flex: '0 1 auto', cursor: 'pointer' }}
            >
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
      </Flex>
    </Flex>
  );
}
