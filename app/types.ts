import { z } from 'zod'

export const incomeStatementSchema = z.object({
  id: z.string(),
  sector: z.string(),
  company: z.string(),
  net_income: z.number().optional(),
  total_sales: z.number().optional(),
  operation_profit: z.number().optional(),
  gross_profit: z.number().optional(),
})

export type IncomeStatement = z.infer<typeof incomeStatementSchema>

export const metricSchema = z.object({
  id: z.number(),
  sector: z.string(),
  name: z.string(),
  per: z.number(),
  psr: z.number(),
  por: z.number(),
  pgpr: z.number(),
  price: z.number(),
})

export type Metric = z.infer<typeof metricSchema>
