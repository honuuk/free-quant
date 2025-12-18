'use client'

import * as React from 'react'
import { IncomeStatement } from '@/app/types'
import { useAppDispatch } from '@/hooks/redux'
import { updateIncomeStatement } from '@/store/income-statement-slice'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  incomeStatement: IncomeStatement | null
}

export function Edit({ open, onOpenChange, incomeStatement }: EditModalProps) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = React.useState({
    net_income: '',
    total_sales: '',
    operation_profit: '',
    gross_profit: '',
  })

  // 숫자 문자열을 콤마가 포함된 문자열로 포맷팅
  const formatNumber = (value: string): string => {
    if (!value) return ''
    // 콤마 제거 후 숫자만 추출
    const numericValue = value.replace(/,/g, '')
    // 숫자가 아닌 경우 빈 문자열 반환
    if (numericValue === '' || numericValue === '-') return numericValue
    // 숫자로 변환 후 콤마 추가
    const num = Number(numericValue)
    if (isNaN(num)) return ''
    return num.toLocaleString('ko-KR')
  }

  // 콤마가 포함된 문자열에서 숫자만 추출
  const parseNumber = (value: string): string => {
    return value.replace(/,/g, '')
  }

  React.useEffect(() => {
    if (incomeStatement) {
      setFormData({
        net_income: incomeStatement.net_income?.toString() || '',
        total_sales: incomeStatement.total_sales?.toString() || '',
        operation_profit: incomeStatement.operation_profit?.toString() || '',
        gross_profit: incomeStatement.gross_profit?.toString() || '',
      })
    }
  }, [incomeStatement])

  const handleChange = (field: keyof typeof formData, value: string) => {
    // 콤마 제거한 숫자만 저장
    const numericValue = parseNumber(value)
    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!incomeStatement) return

    const updated: IncomeStatement = {
      ...incomeStatement,
      net_income: formData.net_income ? Number(formData.net_income) : undefined,
      total_sales: formData.total_sales ? Number(formData.total_sales) : undefined,
      operation_profit: formData.operation_profit ? Number(formData.operation_profit) : undefined,
      gross_profit: formData.gross_profit ? Number(formData.gross_profit) : undefined,
    }
    console.log(updateIncomeStatement(updated))

    dispatch(updateIncomeStatement(updated))
    onOpenChange(false)
  }

  if (!incomeStatement) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>손익계산서 수정</DialogTitle>
          <DialogDescription>
            {incomeStatement.company} ({incomeStatement.id})의 손익계산서 정보를 수정합니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="net_income">당기순이익</Label>
              <Input
                id="net_income"
                value={formatNumber(formData.net_income)}
                onChange={(e) => handleChange('net_income', e.target.value)}
                placeholder="당기순이익을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="total_sales">매출액</Label>
              <Input
                id="total_sales"
                type="text"
                value={formatNumber(formData.total_sales)}
                onChange={(e) => handleChange('total_sales', e.target.value)}
                placeholder="매출액을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="operation_profit">영업이익</Label>
              <Input
                id="operation_profit"
                type="text"
                value={formatNumber(formData.operation_profit)}
                onChange={(e) => handleChange('operation_profit', e.target.value)}
                placeholder="영업이익을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gross_profit">매출총이익</Label>
              <Input
                id="gross_profit"
                type="text"
                value={formatNumber(formData.gross_profit)}
                onChange={(e) => handleChange('gross_profit', e.target.value)}
                placeholder="매출총이익을 입력하세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
