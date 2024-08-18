'use client';

import { useEffect, useState } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import { ChangePageIcon, Page } from './paginations.styled';

type Props = {
  current: number;
  total: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};
const getUpdateVisiblePages = (current: number, total: number) => {
  let pages: (number | string)[] = [];
  if (total <= 7) {
    for (let page = 1; page <= total; page++) {
      pages.push(page);
    }
  } else {
    if (current <= 3) {
      pages = [1, 2, 3, 4, '...', total];
    } else if (current >= total - 2) {
      pages = [1, '...', total - 2, total - 1, total];
    } else {
      pages = [1, '...', current - 1, current, current + 1, '...', total];
    }
  }
  return pages;
};

export const Pagination = (props: Props) => {
  const { total, current, isLoading, onPageChange } = props;
  const [visiblePages, setVisiblePages] = useState<(number | string)[]>(() =>
    getUpdateVisiblePages(current, total)
  );

  useEffect(() => {
    const pages = getUpdateVisiblePages(current, total);
    setVisiblePages(pages);
  }, [current, total]);

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'string') return;
    if (page === current) return;
    onPageChange(page);
  };

  if (total <= 1) return null;

  return (
    <Flex gap={'2'} align={'center'}>
      {total !== 1 && (
        <ChangePageIcon
          onClick={() => onPageChange(current - 1)}
          disabled={isLoading || current === 1}
          variant={'outline'}
        >
          <ArrowRight />
        </ChangePageIcon>
      )}
      <AnimatePresence>
        {visiblePages.map((page, index) => {
          return (
            <Page
              variant={'outline'}
              key={index}
              onClick={() => handlePageChange(page)}
              isCurrentPage={page == current}
              disabled={isLoading || page === '...'}
              style={{ cursor: 'pointer' }}
            >
              <Text {...typoVariant.body2}>{page}</Text>
            </Page>
          );
        })}
      </AnimatePresence>
      {total !== 1 && (
        <ChangePageIcon
          onClick={() => onPageChange(current + 1)}
          disabled={isLoading || current === total}
          variant={'outline'}
        >
          <ArrowLeft />
        </ChangePageIcon>
      )}
    </Flex>
  );
};
