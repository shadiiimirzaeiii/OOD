'use client';

import React from 'react';
import { Flex } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/apis/category';
import { CategoriesListByMode } from '@/types/categories';
import CategoryItem from '../category-item/CategoryItem';

type ListProps = {
  initialData: CategoriesListByMode[];
};

const CategoryList = (props: ListProps) => {
  const { initialData } = props;

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await getCategories();
    },
    initialData: initialData,
  });

  return (
    <Flex direction={'column'} align={'center'} gap={'2'}>
      {data.map(item => (
        <CategoryItem key={item.id} {...item} />
      ))}
    </Flex>
  );
};

export default CategoryList;
