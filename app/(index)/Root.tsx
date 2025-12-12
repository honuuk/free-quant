import { Metric } from '../types'
import { DataTable } from './Root.DataTable'

interface Props {
  data: Metric[]
}

export function Root({ data }: Props) {
  return <DataTable data={data} />
}
