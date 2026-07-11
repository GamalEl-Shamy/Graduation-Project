export interface ProductResponse {
  totalCount: number;
  activeCount: number;
  data: ProductItem[];
}

export interface ProductItem {
  productId: number;
  name: string;
  description: string | null;
  status: boolean;
  mainImg: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  discount: number;
  categoryName: string;
  brandName: string;
  categoryId: number;
  brandId: number;
  rate: number;
  reviewsCount: number;
}

