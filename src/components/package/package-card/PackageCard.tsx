import { Flex, IconButton, Text } from '@radix-ui/themes';
import DeletePackageDialog from '@/components/package/delete-package-dialog/DeletePackageDialog';
import PackageManagementDialog from '@/components/package/package-management-dialog/PackageManagementDialog';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { typoVariant } from '@/theme/typo-variants';
import { PackageItem } from '@/types/package';
import { Card, StyledEdit } from '../package-card/package-card.styled';

const PackageCard = (props: PackageItem) => {
  const { name, discountPrice, price, duration, usageLimit, hasLimit } = props;

  return (
    <Card direction={'column'} gap={'5'}>
      <Flex justify={'between'} align={'center'}>
        <Text {...typoVariant.title1}>{name}</Text>
        {hasLimit && (
          <Text {...typoVariant.body2} style={{ color: 'var(--gray-9)' }}>
            {usageLimit} بار استفاده
          </Text>
        )}
      </Flex>
      <TitleDescription title={'مدت زمان پکیج'} description={`${duration}  روز `} />
      <Flex direction={'column'} gap={'4'}>
        <TitleDescription
          title={'قیمت پکیج'}
          description={price ? ` ${price.toLocaleString('ir-IR')} تومان ` : 'رایگان'}
        />
        <TitleDescription
          title={'قیمت تخفیف'}
          description={discountPrice ? ` ${discountPrice.toLocaleString('ir-IR')} تومان ` : '-'}
        />
      </Flex>
      <Flex gap={'4'} justify={'end'}>
        <PackageManagementDialog
          trigger={
            <IconButton variant={'ghost'}>
              <StyledEdit />
            </IconButton>
          }
          initialData={props}
        />
        <DeletePackageDialog {...props} />
      </Flex>
    </Card>
  );
};

export default PackageCard;
