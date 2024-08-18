'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import SortableItem from './SortableItem';

export default function SearchContent() {
  const { reset, register, handleSubmit } = useForm({
    defaultValues: {
      subCategory: '',
    },
  });
  const [subCatList, setSubCatList] = useState<any[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateListHandler = (data: any) => {
    setSubCatList([...subCatList, { id: subCatList.length + 1, title: data.subCategory }]);
    reset();
  };

  const deleteItemHandler = (idToDelete: number) => {
    const listAfterDelete = subCatList.filter(({ id }) => id !== idToDelete);
    setSubCatList(listAfterDelete);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      setSubCatList(items => {
        const oldIndex = items.findIndex(({ id }) => id === active.id);
        const newIndex = items.findIndex(({ id }) => id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <Box style={{ background: 'var(--gray-5)', border: '1px solid var(--gray-6)', borderRadius: 8 }} p={'4'}>
      <Flex align={'center'} justify={'between'} width={'100%'} mb={'4'}>
        <form onSubmit={handleSubmit(updateListHandler)}>
          <TextFieldRoot style={{ minWidth: 380 }}>
            <TextFieldInput
              {...register('subCategory', { required: true })}
              radius='medium'
              size={'3'}
              placeholder='افزودن دسته بندی'
            />
            <TextFieldSlot>
              <IconButton type='submit' variant='ghost'>
                <PlusCircledIcon />
              </IconButton>
            </TextFieldSlot>
          </TextFieldRoot>
        </form>

        <Flex gap={'5'}>
          {/* TODO: change disable condition to bcakendData === subCatList */}
          <Button size={'3'} color='gray' disabled={!subCatList.length}>
            <Text {...typoVariant.body2}>ثبت تغییرات</Text>
          </Button>
          <Button size={'3'} variant='outline' color='gray'>
            <Text {...typoVariant.body2}>حذف تغییرات</Text>
          </Button>
        </Flex>
      </Flex>

      <Flex direction={'column'} gap={'3'} style={{ overflowY: 'auto' }}>
        <DndContext
          sensors={sensors}
          modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={subCatList} strategy={verticalListSortingStrategy}>
            {subCatList?.map(item => (
              <SortableItem key={item.id} {...item} onDelete={() => deleteItemHandler(item.id)} />
            ))}
          </SortableContext>
        </DndContext>
      </Flex>
    </Box>
  );
}
