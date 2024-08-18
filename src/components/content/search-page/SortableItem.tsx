import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cross2Icon, DragHandleHorizontalIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';

export default function SortableItem({ title, id, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Flex
      ref={setNodeRef}
      width={'100%'}
      px={'4'}
      py={'3'}
      style={{
        ...style,
        borderRadius: 8,
        background: '#fff',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 0,
      }}
      justify={'between'}
      align={'center'}
      {...attributes}
      {...listeners}
    >
      <Flex align={'center'} gap={'4'}>
        <DragHandleHorizontalIcon />
        <Text {...typoVariant.body1}>{title}</Text>
      </Flex>
      <IconButton variant='ghost' color='red' style={{ cursor: 'pointer' }} onClickCapture={onDelete}>
        <Cross2Icon />
      </IconButton>
    </Flex>
  );
}
