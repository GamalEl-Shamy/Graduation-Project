export interface ProductDetailsResponse {
  product: Product;
  relatedProducts: Product[];
}


export interface Product {
  productId: number;
  name: string;
  description: string;
  status: boolean;
  mainImg: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  quantity: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  rate: number;
  reviewsCount: number;
  reviews: Review[];
}

export interface Review {
  userId: string;
  userName: string;
  ratingValue: number;
  createdAt: string;
}