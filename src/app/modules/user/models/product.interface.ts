export interface AllProductResponse {
  pagination: Pagination
  returned: Returned
  categoriesList: CategoriesList[]
}

export interface CategoriesList {
  id: number
  name: string
}


export interface Pagination {
  totalNumberOfPage: number
  currentPage: number
}

export interface Returned {
  productName: any
  minPrice: any
  maxPrice: any
  categoryId: number
  isHot: boolean
  products: Product[]
}

export interface Product {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  rate: number
  discount: number
  traffic: number
  categoryId: number
  category: Category
  brandId: number
  reviewsCount: number
  brand: any
  categoryName: string
}

export interface Category {
  id: number
  name: string
  description: string
  status: boolean
  products: Product2 | undefined[]
}

export interface Product2 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  rate: number
  discount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: any
}
