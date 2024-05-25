import { RemoteLoadStockList } from '@/data/usecases'
import { HttpGetClientSpy, mockRemoteStockListModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadStockList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadStockList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadStockList.Model[]>()
  const sut = new RemoteLoadStockList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadStockList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a list of StockModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteStockListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const stockList = await sut.loadAll()
    expect(stockList).toEqual([{
      id: httpResult[0].id,
      year: httpResult[0].year,
      stock: httpResult[0].stock,
      acronym: httpResult[0].acronym,
      profit: httpResult[0].profit
    }, {
      id: httpResult[1].id,
      year: httpResult[1].year,
      stock: httpResult[1].stock,
      acronym: httpResult[1].acronym,
      profit: httpResult[1].profit
    },
    {
      id: httpResult[2].id,
      year: httpResult[2].year,
      stock: httpResult[2].stock,
      acronym: httpResult[2].acronym,
      profit: httpResult[2].profit
    }])
  })

  test('Should return an empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const stockList = await sut.loadAll()
    expect(stockList).toEqual([])
  })
})
