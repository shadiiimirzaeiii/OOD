import { PlaylistInfoResponse } from '@/apis/playlist';
import { LabelValue } from './menu';
import { Pagination } from './pagination';

export type CategoriesByModeResponse = {
  categoryId: number;
  categoryName: string;
  categoryImagePath: string | null;
};

export type CategoriesForm = {
  image: File;
  name: string;
  latinName: string;
};

export type CategoriesListByMode = {
  id: string;
  name: string;
  latinName: string;
  image: string;
  isActive: boolean;
  modeId?: number;
};

export type SearchFilterProps = {
  sort: LabelValue;
  setSort: (sort: LabelValue) => void;
  search: string;
  setSearch: (search: string) => void;
};

export type SubCategoriesParams = {
  category: string;
  limit: number;
  page: number;
  sort?: string;
  search?: string;
};

export type SubCategoryItem = {
  id: string;
  name: string;
  latinName: string;
  image: string;
  isActive: boolean;
  categoryId: string;
};

export type SubCategoriesListResponse = {
  items: SubCategoryItem[];
} & Pagination;

export type SubCategoryListProps = {
  initialData: SubCategoriesListResponse;
  searchParams: SubCategoriesParams;
};

export type SubCategoryPlaylist = PlaylistInfoResponse & {
  artist: {
    id: string;
    name: string;
  };
};

export type SubCategoryPlaylistsResponse = {
  items: SubCategoryPlaylist[];
} & Pagination;
