// Product Types
export type ProductCategory = "food" | "drink";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
}

export interface ProductCreateDto {
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
}

export interface ProductUpdateDto {
  name?: string;
  price?: number;
  category?: ProductCategory;
  image?: string;
}

export interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
}
