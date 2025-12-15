'use client'

import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { IconCirclePlusFilled } from '@tabler/icons-react'

import { selectIncomeStatements, setIncomeStatements } from '@/store/income-statement-slice'
import { useAppDisPatch, useAppSelector } from '@/hooks/redux'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { IncomeStatement } from '../types'
import QuarterPicker from './Root.QuarterPicker'

const columns: ColumnDef<IncomeStatement>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: 'sector',
    header: '섹터',
    cell: ({ row }) => row.original.sector,
  },
  {
    accessorKey: 'name',
    header: '종목명',
    cell: ({ row }) => row.original.company,
  },
  {
    accessorKey: 'net_income',
    header: '당기순이익',
    cell: ({ row }) => row.original.net_income?.toLocaleString() || '-',
  },
  {
    accessorKey: 'total_sales',
    header: '매출액',
    cell: ({ row }) => row.original.total_sales?.toLocaleString() || '-',
  },
  {
    accessorKey: 'operation_profit',
    header: '영업이익',
    cell: ({ row }) => row.original.operation_profit?.toLocaleString() || '-',
  },
  {
    accessorKey: 'gross_profit',
    header: '매출총이익',
    cell: ({ row }) => row.original.gross_profit?.toLocaleString() || '-',
  },
]

export function DataTable() {
  const incomeStatements = useAppSelector(selectIncomeStatements)

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: incomeStatements,
    columns,
    state: {
      sorting,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
          <IconCirclePlusFilled />
          <span>손익계산서 업로드</span>
        </Button>
        <QuarterPicker year="2025" quarter="4Q" />
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
