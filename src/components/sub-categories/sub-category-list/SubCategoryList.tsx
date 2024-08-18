'use client';

import { useMemo } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Box, Flex } from '@radix-ui/themes';
import CreateCategory from '@/components/categories/create-category/CreateCategory';
import Table from '@/components/shared/table/Table';
import { useSubCategories } from '@/libs/hooks/useSubCategories';
import { Pagination } from '@/libs/primitives/pagination/Pagination';
import { SubCategoryListProps } from '@/types/categories';
import SearchFilter from '../search-filter/SearchFilter';
import { getSubCategoryListColumns } from './list.constant';

const SubCategoryList = (props: SubCategoryListProps) => {
  const data = useSubCategories(props);
  const { query, setCurrentPage, currentPage } = data;
  const { data: subCategoryData, isLoading } = query;

  const router = useRouter();

  const listColumns = useMemo(() => {
    return getSubCategoryListColumns();
  }, []);

  return (
    <Flex gap={'4'} direction={'column'} grow={'1'}>
      <Flex gap={'5'}>
        <CreateCategory type='subCategory' />
        <SearchFilter {...data} />
      </Flex>

      <Table
        data={subCategoryData ? subCategoryData.items : []}
        columns={listColumns}
        onRowClick={({ id }) => router.push(`/categories/playlists/${id}`)}
        cellStyles={{
          cursor: 'pointer',
        }}
        isEvenRowsColored
      />
      <Box mx={'auto'}>
        <Pagination
          isLoading={isLoading}
          current={currentPage}
          total={subCategoryData ? subCategoryData.pages.total : 0}
          onPageChange={p => {
            setCurrentPage(p);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </Box>
    </Flex>
  );
};

export default SubCategoryList;
