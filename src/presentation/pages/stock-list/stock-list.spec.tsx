import { StockList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { LoadStockListSpy, mockAccountModel } from '@/domain/test'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import React from 'react'

type SutTypes = {
  loadStockListSpy: LoadStockListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadStockListSpy = new LoadStockListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <StockList loadStockList={loadStockListSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadStockListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('StockList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const stockList = screen.getByTestId('stock-list')
    expect(stockList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => stockList)
  })

  test('Should call LoadStockList', async () => {
    const { loadStockListSpy } = makeSut()
    expect(loadStockListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render StockItems on success', async () => {
    makeSut()
    const stockList = screen.getByTestId('stock-list')
    await waitFor(() => stockList)
    expect(stockList.querySelectorAll('li.stockItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const loadStockListSpy = new LoadStockListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadStockListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadStockListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('stock-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadStockListSpy = new LoadStockListSpy()
    jest.spyOn(loadStockListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadStockListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadStockList on reload', async () => {
    const loadStockListSpy = new LoadStockListSpy()
    jest.spyOn(loadStockListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadStockListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadStockListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
