import { ArtistListPageSearchParams, GetAristListResponse, GetAristPlaylistResponse } from '@/apis/artist';

export type ArtistListProps = {
  initialData: GetAristListResponse;
  searchParams: ArtistListPageSearchParams;
};

export type ArtistPlayListProps = {
  initialData: GetAristPlaylistResponse;
  searchParams: ArtistListPageSearchParams;
  artistId?: string; // it can also be subcategory id
  rowLinkNavigation: string;
};
