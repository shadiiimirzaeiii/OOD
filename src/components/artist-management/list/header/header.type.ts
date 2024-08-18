import { LabelValue } from '@/types/menu';

export type ListHeaderProps = {
  sort: LabelValue;
  setSort: (sort: LabelValue) => void;
  search: string;
  setSearch: (search: string) => void;
};
