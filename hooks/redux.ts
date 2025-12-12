import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/store/store'

export const useAppDisPatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
