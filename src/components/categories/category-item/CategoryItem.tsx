import Link from 'next/link';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { typoVariant } from '@/theme/typo-variants';
import { CategoriesListByMode } from '@/types/categories';
import EditCategory from '../edit-category/EditCategory';

const CategoryItem = (props: CategoriesListByMode) => {
  const { image, name, id } = props;

  return (
    <Flex
      width={'100%'}
      justify={'between'}
      align={'center'}
      px={'4'}
      py={'2'}
      style={{ backgroundColor: '#FCFCFC', border: '1px solid #F0F0F0', borderRadius: '8px' }}
    >
      {/* right side for item wrapper */}
      <Flex gap={'4'} align={'center'}>
        {image && <Avatar src={IMAGE_BASE_URL + image} fallback='A' size={'1'} />}
        <Text as='span' {...typoVariant.description1}>
          {name}
        </Text>
        <EditCategory {...props} />
      </Flex>
      <Link href={`/categories/${id}`} style={{ textDecoration: 'none', color: '#8D8D8D' }}>
        ...
      </Link>
    </Flex>
  );
};

export default CategoryItem;
