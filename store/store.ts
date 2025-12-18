import { configureStore } from '@reduxjs/toolkit'

import { IncomeStatement } from '@/app/types'
import { incomeStatementReducer } from './income-statement-slice'

export const makeStore = (data: IncomeStatement[]) =>
  configureStore({
    reducer: {
      incomeStatement: incomeStatementReducer,
    },
    preloadedState: {
      incomeStatement: {
        data,
      },
    },
  })

type StoreType = ReturnType<typeof makeStore>
export type AppStore = StoreType
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
