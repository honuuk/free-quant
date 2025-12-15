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

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>
