import { RemoteLoadStockList } from '@/data/usecases'
import faker from 'faker'

export const mockRemoteStockModel = (): RemoteLoadStockList.Model => ( {
  id: faker.random.uuid(),
  year: "2000",
  stock: "petrobras",
  acronym: "petr4",
  profit: "10%"
})

export const mockRemoteStockListModel = (): RemoteLoadStockList.Model[] => ([
  mockRemoteStockModel(),
  mockRemoteStockModel(),
  mockRemoteStockModel()
])
