
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  img: string;
  inStock: boolean;
  isOrganic?: boolean;
  description: string;
}