import { Flex } from '@radix-ui/themes';
import { getSubCategories } from '@/apis/category';
import PageTitle from '@/components/shared/page-title/PageTitle';
import SubCategoryList from '@/components/sub-categories/sub-category-list/SubCategoryList';
import { SubCategoriesParams } from '@/types/categories';

const SubCategoriesPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Omit<SubCategoriesParams, 'category'>;
}) => {
  const subCategories = await getSubCategories({
    category: params.slug,
    limit: 10,
    page: searchParams.page || 1,
    ...(searchParams.sort && { sort: searchParams.sort }),
    ...(searchParams.search && { search: searchParams.search }),
  });

  return (
    <Flex direction={'column'}>
      {/* TODO: fix sub category's name */}
      <PageTitle title={`${''}` + ' ' + 'مدیریت زیر دسته بندی های'} />
      <SubCategoryList
        initialData={subCategories}
        searchParams={{ ...searchParams, category: params.slug }}
      />
    </Flex>
  );
};

export default SubCategoriesPage;
