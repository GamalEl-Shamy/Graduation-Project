export interface CategoryResponse {
  totalCount: number;
  activeCount: number;
  data: CategoryItem[];
}

export interface CategoryItem {
  id: number;
  productsCount: number;
  name: string;
  description: string | null;
  status: boolean;
  products: any[];
}

