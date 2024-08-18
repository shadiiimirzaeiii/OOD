import { LabelValue } from '@/types/menu';

export type ArtistPlayListHeaderProps = {
  sort: LabelValue;
  setSort: (sort: LabelValue) => void;
  search: string;
  setSearch: (search: string) => void;
  buttonLinkNavigation: string;
  textButton: string;
};
