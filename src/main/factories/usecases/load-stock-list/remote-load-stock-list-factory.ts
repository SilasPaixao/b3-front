import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'
import { LoadStockList } from '@/domain/usecases'
import { RemoteLoadStockList } from '@/data/usecases'

export const makeRemoteLoadStockList = (): LoadStockList => {
  return new RemoteLoadStockList(makeApiUrl('/stocks'), makeAuthorizeHttpGetClientDecorator())
}
