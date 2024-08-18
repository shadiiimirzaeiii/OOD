import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import PackageManagementDialog from '@/components/package/package-management-dialog/PackageManagementDialog';
import { typoVariant } from '@/theme/typo-variants';
import { AddBox } from './add-package-box.styled';

const AddPackageBox = () => {
  return (
    <PackageManagementDialog
      trigger={
        <AddBox justify={'center'} align={'center'} direction={'column'} gap={'3'}>
          <PlusCircledIcon />
          <Text color={'teal'} {...typoVariant.title1}>
            اضافه کردن پکیج
          </Text>
        </AddBox>
      }
    />
  );
};

export default AddPackageBox;
