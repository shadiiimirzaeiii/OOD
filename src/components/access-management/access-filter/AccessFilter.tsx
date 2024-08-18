'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Text } from '@radix-ui/themes';
import { ROLE } from '@/constants/routes';
import { typoVariant } from '@/theme/typo-variants';
import { roleConstant } from '../access-management.constant';

const AccessFilter = ({ role }: { role?: string }) => {
  const { push } = useRouter();

  const handleSearchParams = ({ lable, value }: { id: string; lable: string; value?: ROLE }) => {
    const params = new URLSearchParams();

    value && params.append('role', lable);

    const generatedUrl = `access?${params.toString()}`;

    push(generatedUrl, { scroll: false });
  };

  return (
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
            {role && role !== 'بازنشانی فیلتر' ? role : 'فیلتر کاربران'}
          </Text>
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={{ width: 175 }}>
        {roleConstant.map(option => (
          <DropdownMenu.Item
            key={option.id}
            onSelect={() => handleSearchParams(option)}
            style={{ cursor: 'pointer' }}
          >
            {option.lable}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AccessFilter;
