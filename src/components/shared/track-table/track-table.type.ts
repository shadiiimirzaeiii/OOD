export type TrackItem = {
  playlistId: string;
  id: string;
  title: string;
  latinName: string;
  artwork: string;
  isActive: boolean;
  duration: number;
  isPremium: boolean;
  files?: TrackFile[];
  createdAt: string;
  updatedAt: string;
  url: string;
};

export type TrackFile = {
  id: string;
  path: string;
  duration: number;
  isPremium: boolean;
  trackId: string;
  quality: string;
  createdAt: string;
  updatedAt: string;
};
