import React from 'react';
import { Badge, EmptyState, LoadingBar, ScrollArea, Table, TableCard, TableHeader, TableHint, TableTitle, TBody, Td, Th, THead, Tr } from './TableStyle';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  title: string;
  hint?: string;
  columns: Array<TableColumn<T>>;
  rowsData: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowEventClick?: (row: T) => void;
}

const getTransactionTone = (value: string) => {
  const normalized = value.toLowerCase();
  if (normalized === 'commit') return 'success';
  if (normalized === 'auth') return 'warning';
  if (normalized === 'refund') return 'danger';
  return 'neutral';
}

export const renderBadge = (value: string) => (
  <Badge $tone={getTransactionTone(value)}>{value}</Badge>
);

export const GenericTable = <T extends Record<string, any>>(props: TableProps<T>) => {
  const { title, hint, columns, rowsData, rowEventClick, loading = false, emptyMessage = 'No records found.' } = props;

  return (
    <TableCard>
      <TableHeader>
        <TableTitle>{title}</TableTitle>
        {hint ? <TableHint>{hint}</TableHint> : null}
      </TableHeader>
      <ScrollArea>
        <Table>
          <THead>
            <tr>
              {columns.map((column) => (
                <Th key={String(column.key)}>{column.label}</Th>
              ))}
            </tr>
          </THead>
          <TBody>
            {loading ? (
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {columns.map((column) => (
                    <Td key={String(column.key)}>
                      <LoadingBar />
                    </Td>
                  ))}
                </Tr>
              ))
            ) : rowsData.length > 0 ? (
              rowsData.map((row, rowIndex) => (
                <Tr
                  key={row.id ?? rowIndex}
                  $clickable={Boolean(rowEventClick)}
                  onClick={() => rowEventClick?.(row)}
                >
                  {columns.map((column) => {
                    const value = row[column.key];
                    return (
                      <Td key={String(column.key)}>
                        {column.render ? column.render(value, row) : String(value)}
                      </Td>
                    );
                  })}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length}>
                  <EmptyState>{emptyMessage}</EmptyState>
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </ScrollArea>
    </TableCard>
  )
}
