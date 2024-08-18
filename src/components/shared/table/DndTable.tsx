'use client';

import { CSSProperties, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table as RadixTable } from '@radix-ui/themes';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import styled, { css } from 'styled-components';
import { CenterWrapper, Root, StyledHeader } from './table.styled';

interface Props<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  onRowClick?: (row: TData) => void;
  rowStyles?: CSSProperties;
  cellStyles?: CSSProperties;
  onReachLastItem?: () => void;
  isLastPage?: boolean;
  isEvenRowsColored?: boolean;
  handleDragEnd: (event: DragEndEvent, dataIds: UniqueIdentifier[]) => void;
}

function DndTable<T extends { id: string }>(props: Props<T>) {
  const { columns, data, handleDragEnd, isEvenRowsColored = false } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id,
  });

  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);

  const { ref: invisibleLastItemRef } = useInView({
    threshold: 0,
    onChange: inView => inView && props.onReachLastItem?.(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const DraggableRow = ({ row }: { row: Row<T> }) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
      id: row.original.id,
    });

    const dndStyles: CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition: transition,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : 0,
      position: 'relative',
    };
    return (
      // connect row ref to dnd-kit, apply important styles
      <RadixTable.Row
        ref={setNodeRef}
        onClick={() => props.onRowClick?.(row.original)}
        style={{ textAlign: 'center', ...props.rowStyles, ...dndStyles }}
      >
        {row.getVisibleCells().map(cell => (
          <RadixTable.Cell
            //@ts-ignore
            style={{ width: cell.column.columnDef.meta?.maxWidth ?? 200, ...props.cellStyles }}
            key={cell.id}
          >
            {/* @ts-ignore */}
            {cell.column.columnDef.meta?.preventCenterLayout ? (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            ) : (
              <CenterWrapper>{flexRender(cell.column.columnDef.cell, cell.getContext())}</CenterWrapper>
            )}
          </RadixTable.Cell>
        ))}
      </RadixTable.Row>
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
      onDragEnd={event => handleDragEnd(event, dataIds)}
      sensors={sensors}
    >
      <Root variant='surface'>
        <StyledHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <RadixTable.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <RadixTable.ColumnHeaderCell style={{ textAlign: 'center' }} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </RadixTable.ColumnHeaderCell>
              ))}
            </RadixTable.Row>
          ))}
        </StyledHeader>

        <StyledTable isEvenRowsColored={isEvenRowsColored}>
          <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map(row => (
              <DraggableRow key={row.id} row={row} />
            ))}
            {!props.isLastPage && props.onReachLastItem && (
              <div ref={invisibleLastItemRef} style={{ height: 32, width: '100%' }} />
            )}
          </SortableContext>
        </StyledTable>
      </Root>
    </DndContext>
  );
}

export default DndTable;

const StyledTable = styled(RadixTable.Body)<{ isEvenRowsColored: boolean }>`
  ${({ isEvenRowsColored }) =>
    isEvenRowsColored &&
    css`
      tr:nth-child(odd) {
        background: #f0f0f0;
      }
    `}
`;
