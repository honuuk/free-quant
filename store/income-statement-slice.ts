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
    updateIncomeStatement: (state, action: PayloadAction<IncomeStatement>) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.data[index] = action.payload
      }
    },
  },
})

export const { setIncomeStatements, updateIncomeStatement } = incomeStatementSlice.actions
export const incomeStatementReducer = incomeStatementSlice.reducer

export const selectIncomeStatements = (state: RootState) => state.incomeStatement.data
