import { useForm } from 'react-hook-form';
import { UploadIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import ImagePicker from '@/components/shared/image-picker/ImagePicker';
import { Input } from '@/libs/primitives/input/Input';

type Props = {
  dismiss: () => void;
  image?: string;
  link?: string;
};

const BannerContent = ({ dismiss, image, link }: Props) => {
  const { register, setValue } = useForm<{ image: File; link: string }>({
    defaultValues: {
      link,
    },
  });

  return (
    <Flex direction={'column'} gap={'5'}>
      <ImagePicker
        defaultImage={image ? image : ''}
        title={'آپلود تصویر بنر'}
        icon={<UploadIcon />}
        onChange={image => setValue('image', image as File)}
        style={{ width: '100%', height: '324px' }}
      />
      <Input {...register('link')} title='لینک' placeholder='لینک بنر را بارگزاری کنید' />
      <Flex gap={'5'} justify={'center'}>
        <Button size={'3'} color='sky'>
          ثبت و ادامه
        </Button>
        <Button variant='outline' size={'3'} onClick={dismiss}>
          انصراف و بازگشت
        </Button>
      </Flex>
    </Flex>
  );
};

export default BannerContent;
