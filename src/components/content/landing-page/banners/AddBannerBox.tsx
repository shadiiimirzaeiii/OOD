import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import { AddBox } from '@/components/package/add-package-box/add-package-box.styled';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import { typoVariant } from '@/theme/typo-variants';
import BannerContent from './BannerContent';

const AddBannerBox = () => {
  return (
    <CustomDialog
      trigger={
        <AddBox
          justify={'center'}
          align={'center'}
          direction={'column'}
          gap={'3'}
          style={{ width: '314px', minHeight: 'unset', height: 'unset', flexShrink: 0 }}
        >
          <PlusCircledIcon />
          <Text color={'teal'} {...typoVariant.title1}>
            اضافه کردن بنر
          </Text>
        </AddBox>
      }
      content={dismiss => <BannerContent {...{ dismiss }} />}
    />
  );
};

export default AddBannerBox;
