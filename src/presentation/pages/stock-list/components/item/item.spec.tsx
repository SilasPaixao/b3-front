import { StockItem } from '@/presentation/pages/stock-list/components'
import { mockStockModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (stock = mockStockModel()): void => {
  render(<StockItem stock={stock} />)
}

describe('StockItem Component', () => {
  test('Should render with correct values', () => {
    const stock = mockStockModel()
    makeSut(stock)
    expect(screen.getByTestId('year')).toHaveTextContent(stock.year)
    expect(screen.getByTestId('stock')).toHaveTextContent(stock.stock)
    expect(screen.getByTestId('acronym')).toHaveTextContent(stock.acronym)
    expect(screen.getByTestId('year')).toHaveTextContent(stock.year)
  })
})
