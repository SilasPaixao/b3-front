import { LoadStockList } from '@/domain/usecases'
import faker from 'faker'

export const mockStockModel = (): LoadStockList.Model => ({
  id: faker.random.uuid(),
  year: "2000",
  stock: "petrobras",
  acronym: "petr4",
  profit: "10%"
})

export const mockStockListModel = (): LoadStockList.Model[] => ([
  mockStockModel(),
  mockStockModel(),
  mockStockModel()
])

export class LoadStockListSpy implements LoadStockList {
  callsCount = 0
  stocks = mockStockListModel()

  async loadAll (): Promise<LoadStockList.Model[]> {
    this.callsCount++
    return this.stocks
  }
}
