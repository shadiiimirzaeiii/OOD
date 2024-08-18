'use client';

import { CSSProperties } from 'react';
import { useInView } from 'react-intersection-observer';
import { Table as RadixTable } from '@radix-ui/themes';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
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
}

function Table<T>(props: Props<T>) {
  const { columns, data, isEvenRowsColored = false } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { ref: invisibleLastItemRef } = useInView({
    threshold: 0,
    onChange: inView => inView && props.onReachLastItem?.(),
  });

  return (
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
        {table.getRowModel().rows.map(row => (
          <RadixTable.Row
            onClick={() => props.onRowClick?.(row.original)}
            key={row.id}
            style={{ textAlign: 'center', position: 'relative', ...props.rowStyles }}
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
        ))}
        {!props.isLastPage && props.onReachLastItem && (
          <div ref={invisibleLastItemRef} style={{ height: 32, width: '100%' }} />
        )}
      </StyledTable>
    </Root>
  );
}

export default Table;

const StyledTable = styled(RadixTable.Body)<{ isEvenRowsColored: boolean }>`
  ${({ isEvenRowsColored }) =>
    isEvenRowsColored &&
    css`
      tr:nth-child(odd) {
        background: #f0f0f0;
      }
    `}
`;
