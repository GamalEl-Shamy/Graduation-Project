export interface Carts {
  carts: Cart[]
  totalPrice: number
}

export interface Cart {
  applicationUserId: string
  applicationUser: ApplicationUser
  productId: number
  product: CartProduct
  count: number
}

export interface ApplicationUser {
  firstName: string
  lastName: string
  address: any
  refreshToken: string
  refreshTokenExpiryTime: string
  id: string
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: any
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: any
  lockoutEnabled: boolean
  accessFailedCount: number
}

export interface CartProduct {
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
