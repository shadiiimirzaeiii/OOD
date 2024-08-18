import Link from 'next/link';
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';

const PageTitle = ({ title, backPath }: { title: string; backPath?: string }) => {
  return (
    <Flex align={'center'} width={'100%'} justify={'between'} mb={'6'}>
      <Heading as='h4' {...typoVariant.h4}>
        {title}
      </Heading>

      {backPath && (
        <Link href={backPath}>
          <Button size={'3'} variant='ghost' style={{ cursor: 'pointer' }}>
            <TriangleLeftIcon />
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default PageTitle;
