import { IncomeStatement } from '@/app/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export const incomeStatementSlice = createSlice({
  name: 'incomeStatement',
  initialState: {
    data: [] as IncomeStatement[],
  },
  reducers: {
    setIncomeStatements: (state, action: PayloadAction<IncomeStatement[]>) => {
      state.data = action.payload
    },
  },
})

export const { setIncomeStatements } = incomeStatementSlice.actions
export const incomeStatementReducer = incomeStatementSlice.reducer

export const selectIncomeStatements = (state: RootState) => state.incomeStatement.data
