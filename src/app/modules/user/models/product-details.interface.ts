export interface ProductDetails {
  product: Product
  relatedProducts: RelatedProduct[]
}

export interface Product {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: Category
  brandId: number
  brand: Brand2
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
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: Brand
}

export interface Brand {
  id: number
  name: string
  description: string
  status: boolean
  products: Product3 | undefined[]
}

export interface Product3 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: any
}

export interface Brand2 {
  id: number
  name: string
  description: string
  status: boolean
  products: Product4 | undefined[]
}

export interface Product4 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: Category2
  brandId: number
  brand: any
}

export interface Category2 {
  id: number
  name: string
  description: string
  status: boolean
  products: Product5 | undefined[]
}

export interface Product5 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: any
}

export interface RelatedProduct {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: Category3
  brandId: number
  brand: Brand4
}

export interface Category3 {
  id: number
  name: string
  description: string
  status: boolean
  products: Product6 | undefined[]
}

export interface Product6 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: Brand3
}

export interface Brand3 {
  id: number
  name: string
  description: string
  status: boolean
  products: Product7 | undefined[]
}

export interface Product7 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: any
}

export interface Brand4 {
  id: number
  name: string
  description: string
  status: boolean
  products: Product8 | undefined[]
}

export interface Product8 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: Category4
  brandId: number
  brand: any
}

export interface Category4 {
  id: number
  name: string
  description: string
  status: boolean
  products: Product9 | undefined[]
}

export interface Product9 {
  productId: number
  name: string
  description: string
  status: boolean
  mainImg: string
  price: number
  quantity: number
  reviews: any[]
  rate: number
  discount: number
  priceAfterDiscount: number
  traffic: number
  categoryId: number
  category: any
  brandId: number
  brand: any
}
