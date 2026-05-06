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
  quantity: number;
  discount: number;
  categoryId: number;
  brandId: number;
}

