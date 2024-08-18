import Link from 'next/link';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { More } from '@/public/icon';
import { User } from '@/types/access-management';

type Props = User & { row: number };

const UserCard = (props: Props) => {
  return (
    <Box
      py={'2'}
      px={'7'}
      style={{
        borderRadius: '4px',
        boxShadow:
          ' 0px 1px 4px 0px rgba(0, 0, 61, 0.05), 0px 2px 1px -1px rgba(0, 0, 61, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)',
      }}
      position={'relative'}
    >
      <Flex justify={'between'} align={'center'}>
        <Flex gap='4' style={{ width: '33%' }}>
          <Text>{props.row}</Text>
          <Text>{props.name}</Text>
        </Flex>
        <Flex gap='4' style={{ width: '33%' }}>
          <Text>{props.username}</Text>
        </Flex>
        <Flex gap='4' style={{ width: '33%' }}>
          <Text>{props.role}</Text>
        </Flex>
        <Link
          href={`/access/info/${props.id}`}
          style={{ textDecoration: 'none', color: 'var(--gray-gray-12)' }}
        >
          <Button style={{ cursor: 'pointer' }} variant='ghost' color='gray'>
            <More />
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default UserCard;
