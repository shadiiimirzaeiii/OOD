'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Accordion from '@radix-ui/react-accordion';
import { ExitIcon } from '@radix-ui/react-icons';
import { Box, Flex, Text } from '@radix-ui/themes';
import { sidebar } from '@/constants/sidebar/sidebar';
import AccessGate from '@/libs/providers/AccessGate';
import { StyledButton } from './sidebar.styled';
import SideBarItem from './SideBarItem';

const SideBar = () => {
  const pathname = usePathname();
  const rootPath = `/${pathname.split('/')[1]}`;

  return (
    <Box
      height={'100%'}
      p={'5'}
      style={{
        width: '210px',
        borderRadius: '8px 0 0 8px',
        boxShadow: '20px 0px 32px 8px rgba(0, 0, 0, 0.25)',
        backgroundColor: '#FCFCFC',
      }}
    >
      <Flex direction={'column'} justify={'between'} width={'100%'} height={'100%'}>
        <Flex direction={'column'} width={'100%'} gap={'7'} align={'center'}>
          <Box width={'7'} height={'7'} position={'relative'}>
            <Link href={'/'}>
              <Image src={'/image/main-logo.png'} fill alt='Oud Logo' />
            </Link>
          </Box>
          <Accordion.Root type='single' collapsible style={{ width: '100%' }}>
            <Flex direction={'column'} gap={'2'} width={'100%'}>
              {sidebar.map((item, idx) => (
                <AccessGate key={item.title} confirmedRoles={item.confirmedRoles}>
                  <SideBarItem
                    title={item.title}
                    path={item.path}
                    icon={<item.icon />}
                    child={item.child}
                    value={idx + 1}
                    $isCurrent={item.path === pathname || rootPath === item.path}
                  />
                </AccessGate>
              ))}
            </Flex>
          </Accordion.Root>
        </Flex>
        <StyledButton
          variant='ghost'
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
          }}
        >
          <Flex gap={'2'} align={'center'} width={'100%'}>
            <Box width={'4'} height={'4'}>
              <ExitIcon />
            </Box>
            <Text as='span' size={'2'} style={{ paddingBottom: '4px' }}>
              {'خروج'}
            </Text>
          </Flex>
        </StyledButton>
      </Flex>
    </Box>
  );
};

export default SideBar;
