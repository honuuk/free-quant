import { configureStore } from '@reduxjs/toolkit'

import { incomeStatementReducer } from './income-statement-slice'

export const store = configureStore({
  reducer: {
    incomeStatement: incomeStatementReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
