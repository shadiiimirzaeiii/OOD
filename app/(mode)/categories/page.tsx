import { Flex } from '@radix-ui/themes';
import { getCategories } from '@/apis/category';
import CategoryList from '@/components/categories/category-list/CategoryList';
import CreateCategory from '@/components/categories/create-category/CreateCategory';
import PageTitle from '@/components/shared/page-title/PageTitle';

export default async function CategoriesPage() {
  const data = await getCategories();

  return (
    <Flex direction={'column'} gap={'5'}>
      <PageTitle title='مدیریت دسته بندی ها' />
      <CreateCategory />
      <CategoryList initialData={data} />
    </Flex>
  );
}
