// Discount Types
export type DiscountType = "percentage" | "fixed";

export interface Discount {
  id: number;
  code: string;
  discountType: DiscountType;
  value: number;
  maxUsage: number | null;
  minPurchase: number | null;
  expiryDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DiscountCreateDto {
  code: string;
  discountType: DiscountType;
  value: number;
  maxUsage?: number;
  minPurchase?: number;
  expiryDate: Date;
}

export interface DiscountUpdateDto {
  code?: string;
  discountType?: DiscountType;
  value?: number;
  maxUsage?: number;
  minPurchase?: number;
  expiryDate?: Date;
}

export interface DiscountResponseDto {
  id: number;
  code: string;
  discountType: DiscountType;
  value: number;
  maxUsage?: number;
  minPurchase?: number;
  expiryDate: Date;
  createdAt: Date;
}
