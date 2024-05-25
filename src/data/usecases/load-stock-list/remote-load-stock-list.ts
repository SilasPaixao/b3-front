import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { LoadStockList } from '@/domain/usecases'

export class RemoteLoadStockList implements LoadStockList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadStockList.Model[]>
  ) { }

  async loadAll (): Promise<LoadStockList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    const remoteStocks = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteStocks.map(remoteStock => remoteStock)
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadStockList {
  export type Model = {
    id: string
    year: string
    stock: string
    acronym: string
    profit: string
  }
}
