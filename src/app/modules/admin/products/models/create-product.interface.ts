export interface ProductRequest {
  name: string;
  description: string | null;
  status: boolean;
  mainImg: File | string | null;
  price: number;
  quantity: number;
  discount: number;
  categoryId: number;
  brandId: number;
}