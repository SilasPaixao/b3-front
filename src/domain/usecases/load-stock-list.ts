export interface LoadStockList {
  loadAll: () => Promise<LoadStockList.Model[]>
}

export namespace LoadStockList {
  export type Model = {
    id: string,
    year: string,
    stock: string,
    acronym: string,
    profit: string
  }
}
