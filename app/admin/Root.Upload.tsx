import { IconCirclePlusFilled } from '@tabler/icons-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Quarter, Year } from '@/lib/types'

interface Props {
  year: Year
  quarter: Quarter
}

const FILE_FIELDS = [
  { name: 'is', label: '손익계산서' },
  { name: 'is_cons', label: '손익계산서 연결' },
  { name: 'ci', label: '포괄손익계산서' },
  { name: 'ci_cons', label: '포괄손익계산서 연결' },
] as const

const isValidFile = (data: FormDataEntryValue | null): data is File =>
  data instanceof File && data.size > 0

export const Upload: React.FC<Props> = ({ year, quarter }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const files = FILE_FIELDS.map(({ name }) => formData.get(name))
    const hasInvalidFile = files.some((file) => !isValidFile(file))

    if (hasInvalidFile) {
      toast.error('모든 파일을 업로드해주세요.')
      return
    }
  }

  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
            <IconCirclePlusFilled />
            재무제표 업로드
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{`${year}년 ${quarter} 재무제표 업로드`}</DialogTitle>
              <DialogDescription>{`${year}년 ${quarter}의 재무제표를 업로드 합니다.`}</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <FieldSet>
                {FILE_FIELDS.map(({ name, label }) => (
                  <FieldGroup key={name}>
                    <Field>
                      <FieldLabel required htmlFor={name}>
                        {label}
                      </FieldLabel>
                      <Input type="file" id={name} name={name} accept="text/plain" />
                    </Field>
                  </FieldGroup>
                ))}
              </FieldSet>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">닫기</Button>
              </DialogClose>
              <Button type="submit">업로드</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
