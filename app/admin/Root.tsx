'use client'

import { Provider as ReduxProvider } from 'react-redux'

import { makeStore } from '@/store/store'
import { DataTable } from './Root.DataTable'
import { IncomeStatement } from '../types'
import { Upload } from './Root.Upload'

interface Props {
  data: IncomeStatement[]
}

export function Root({ data }: Props) {
  return (
    <ReduxProvider store={makeStore(data)}>
      <div className="w-full flex flex-col justify-start gap-6">
        <Upload year={'2025'} quarter="3Q" />
        <DataTable />
      </div>
    </ReduxProvider>
  )
}
