'use client'

import { Provider as ReduxProvider } from 'react-redux'

import { store } from '@/store/store'
import { DataTable } from './Root.DataTable'
import { IncomeStatement } from '../types'

interface Props {
  data: IncomeStatement[]
}

export function Root({ data }: Props) {
  return (
    <ReduxProvider store={store}>
      <DataTable data={data} />
    </ReduxProvider>
  )
}
