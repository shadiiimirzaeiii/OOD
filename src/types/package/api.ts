export type PackageItem = {
  id: string;
  name: string;
  price: number;
  duration: number;
  hasDiscount?: boolean;
  discountPrice?: number;
  hasLimit?: boolean;
  usageLimit?: number;
  updatedAt?: string;
  createdAt?: string;
};
