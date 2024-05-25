import { makeRemoteLoadStockList } from '@/main/factories/usecases'
import { StockList } from '@/presentation/pages'
import React from 'react'

export const makeStockList: React.FC = () => {
  return (
    <StockList
      loadStockList={makeRemoteLoadStockList()}
    />
  )
}
