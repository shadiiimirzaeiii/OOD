'use client';

import React from 'react';
import { Flex } from '@radix-ui/themes';
import Header from '../artist-management/search-track/Header';
import TicketCard from './TicketCard';

const TicketList = () => {
  return (
    <Flex direction='column' gap={'6'}>
      {/* <Header /> */}
      <Flex direction={'column'} gap={'4'}>
        {Array.from({ length: 5 }).map((_, i) => (
          <TicketCard key={i} />
        ))}
      </Flex>
    </Flex>
  );
};

export default TicketList;
