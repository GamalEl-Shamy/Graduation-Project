export interface Brand {
  totalCount: number
  activeCount: number
  data: brandItems[]
}

export interface brandItems {
  id: number
  productsCount: number
  name: string
  description: string
  status: boolean
  products: any[]
}
