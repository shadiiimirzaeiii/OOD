export enum ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  BASIC_USER = 'BASIC_USER',
}

export enum ROUTE_TYPE {
  WITHOUT_AUTHENTICATION,
  WITH_AUTHENTICATION,
}

export interface RouteObject<T> {
  url: T;
  path: string;
  accessList: ROLE[];
  type: ROUTE_TYPE;
}

export interface RoutesListInterface {
  dashboard: RouteObject<string>;
  access: RouteObject<string>;
  createUser: RouteObject<string>;
  editUser: RouteObject<(id: string) => string>;
  userInfo: RouteObject<(id: string) => string>;
  categories: RouteObject<string>;
  subCategories: RouteObject<(id: string) => string>;
  artist: RouteObject<string>;
  artistInfo: RouteObject<(id: string) => string>;
  createArtist: RouteObject<string>;
  editArtist: RouteObject<(id: string) => string>;
  playlistInfo: RouteObject<(id: string) => string>;
  createPlaylist: RouteObject<(id: string) => string>;
  editPlaylist: RouteObject<(id: string) => string>;
  requests: RouteObject<string>;
  requestDetail: RouteObject<(id: string) => string>;
  tracks: RouteObject<string>;
  track: RouteObject<(id: string) => string>;
  editTrack: RouteObject<(id: string) => string>;
  searchContent: RouteObject<string>;
  landingContent: RouteObject<string>;
  landingBanners: RouteObject<string>;
  createBanner: RouteObject<string>;
  editBanner: RouteObject<(id: string) => string>;
  events: RouteObject<string>;
  notifications: RouteObject<string>;
  createNotification: RouteObject<string>;
  editNotification: RouteObject<(id: string) => string>;
  tickets: RouteObject<string>;
  ticketDetail: RouteObject<(id: string) => string>;
  packages: RouteObject<string>;
  analytics: RouteObject<string>;
  offerCodes: RouteObject<string>;
  offerDetail: RouteObject<(id: string) => string>;
  createOffer: RouteObject<string>;
  editOffer: RouteObject<(id: string) => string>;
  robot: RouteObject<string>;
  robotSetting: RouteObject<string>;
  upload: RouteObject<string>;
  login: RouteObject<string>;
}

export const routesList: RoutesListInterface = {
  dashboard: {
    url: '/',
    path: '/',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  access: {
    url: '/access',
    path: '/access',
    accessList: [ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  createUser: {
    url: `/access/create`,
    path: '/access/create',
    accessList: [ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editUser: {
    url: id => `/access/edit/${id}`,
    path: '/access/edit',
    accessList: [ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  userInfo: {
    url: id => `/access/info${id}`,
    path: '/access/info',
    accessList: [ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  categories: {
    url: '/categories',
    path: '/categories',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  subCategories: {
    url: id => `/categories/${id}`,
    path: '/categories',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  artist: {
    url: '/artist',
    path: '/artist',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  artistInfo: {
    url: id => `/artist/info/${id}`,
    path: '/artist/info',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  createArtist: {
    url: `/artist/create`,
    path: '/artist/create',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editArtist: {
    url: id => `/artist/edit/${id}`,
    path: '/artist/edit',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  playlistInfo: {
    url: id => `/playlist/info/${id}`,
    path: '/playlist/info',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  createPlaylist: {
    url: id => `/playlist/create/${id}`,
    path: '/playlist/create',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editPlaylist: {
    url: id => `/playlist/edit/${id}`,
    path: '/playlist/edit',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  requests: {
    url: '/requests',
    path: '/requests',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  requestDetail: {
    url: id => `/request/${id}`,
    path: '/request',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  tracks: {
    url: '/tracks',
    path: '/tracks',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  track: {
    url: id => `/track/${id}`,
    path: '/track',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editTrack: {
    url: id => `/track/edit/${id}`,
    path: '/track/edit',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  searchContent: {
    url: '/content/search',
    path: '/content/search',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  landingContent: {
    url: '/content/landing',
    path: '/content/landing',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  landingBanners: {
    url: '/content/landing/banners',
    path: '/content/landing/banners',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  createBanner: {
    url: '/content/landing/banners/create',
    path: '/content/landing/banners/create',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editBanner: {
    url: id => `/content/landing/banners/edit/${id}`,
    path: '/content/landing/banners/edit',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  events: {
    url: '/content/landing/events',
    path: '/content/landing/events',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  notifications: {
    url: '/notifications',
    path: '/notifications',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  createNotification: {
    url: '/notifications/create',
    path: '/notifications/create',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editNotification: {
    url: id => `/notifications/edit/${id}`,
    path: '/notifications/edit',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  tickets: {
    url: '/tickets',
    path: '/tickets',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  ticketDetail: {
    url: id => `/tickets/detail/${id}`,
    path: '/tickets/detail',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  packages: {
    url: '/package/list',
    path: '/package/list',
    accessList: [ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  analytics: {
    url: '/analytics',
    path: '/analytics',
    accessList: [ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  offerCodes: {
    url: '/offer',
    path: '/offer',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  offerDetail: {
    url: id => `/offer/info/${id}`,
    path: '/offer/info',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  createOffer: {
    url: '/offer/create',
    path: '/offer/create',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  editOffer: {
    url: id => `/offer/edit/${id}`,
    path: '/offer/edit',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  robot: {
    url: '/robot',
    path: '/robot',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  upload: {
    url: '/upload',
    path: '/upload',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  robotSetting: {
    url: '/robot/setting',
    path: '/robot/setting',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITH_AUTHENTICATION,
  },
  login: {
    url: '/login',
    path: '/login',
    accessList: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    type: ROUTE_TYPE.WITHOUT_AUTHENTICATION,
  },
};
