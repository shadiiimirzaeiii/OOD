import { PackageItem } from '@/types/package';

export type PackageListProps = { packages: PackageItem[] };

export type PackageForm = Omit<
  PackageItem,
  'hasLimit' | 'hasDiscount' | 'updatedAt' | 'createdAt' | 'usageLimit' | 'id'
>;
