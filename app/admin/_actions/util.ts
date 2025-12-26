import iconv from 'iconv-lite'

export const decodeFileToLines = async (file: File): Promise<string[]> => {
  const buffer = Buffer.from(await file.arrayBuffer())
  const text = iconv.decode(buffer, 'EUC-KR')
  return text.split(/\r?\n/)
}

export const codeToFactor = (code: string) => {
  switch (code) {
    case 'ifrs-full_ProfitLoss':
      return 'net_income'
    case 'ifrs-full_Revenue':
      return 'total_sales'
    case 'dart_OperatingIncomeLoss':
      return 'operation_profit'
    case 'ifrs-full_GrossProfit':
      return 'gross_profit'
    default:
      return
  }
}

export const parseLine = (line: string) => {
  const [, companyCode, company, market, , sector, , , , , valueCode, name, , value] = line
    .split('\t')
    .map((str) => str.trim())

  if (!companyCode) console.log(companyCode, company, market, sector, valueCode, name, value, line)

  return {
    id: companyCode.replace('[', '').replace(']', ''),
    market,
    company,
    sector,
    valueCode,
    name,
    value,
  }
}

export const toNumber = (value?: string) => {
  if (!value) return undefined
  return Number(value.replaceAll(',', ''))
}
