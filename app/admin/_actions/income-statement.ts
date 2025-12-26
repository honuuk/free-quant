'use server'

import path from 'path'
import fs from 'fs'

import { IncomeStatement } from '@/app/types'
import { codeToFactor, decodeFileToLines, parseLine, toNumber } from './util'
import { Quarter, Year } from '@/lib/types'

export const updateQuarterIncomeStatement = async (year: Year, quarter: Quarter, files: File[]) => {
  const result: Record<string, IncomeStatement> = {}

  for (const file of files) {
    const lines = await decodeFileToLines(file)
    for (const line of lines) {
      if (!line) continue

      const data = parseLine(line)

      if (data.market !== '유가증권시장상장법인') continue
      if (data.sector?.includes('금융')) continue

      const factor = codeToFactor(data.valueCode)
      if (!factor) continue

      const company = data.company
      const value = toNumber(data.value)

      if (!result[company]) {
        result[company] = {
          id: data.id,
          company: data.company,
          sector: data.sector,
          net_income: undefined,
          total_sales: undefined,
          operation_profit: undefined,
          gross_profit: undefined,
        }
      }

      result[company][factor] = value
    }
  }

  console.log(process.cwd())

  const baseDir = path.join(process.cwd(), 'app', 'admin', '_data', year, quarter)
  const filePath = path.join(baseDir, 'data.json')

  fs.mkdirSync(baseDir, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(Object.values(result), null, 2), 'utf-8')

  return {
    success: true,
    companyCount: Object.keys(result).length,
  }
}
