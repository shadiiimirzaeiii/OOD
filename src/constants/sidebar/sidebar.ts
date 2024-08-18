import {
  ChatBubbleIcon,
  CodeIcon,
  CubeIcon,
  DashboardIcon,
  MobileIcon,
  PersonIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import SvgCouponsIcon from '@/public/icon/CouponsIcon';
import SvgMusicIcon from '@/public/icon/MusicIcon';
import { ROLE, routesList } from '../routes';

// NOTE: update the '#' in path field to actual route using routesList from ../routes;

export const sidebar = [
  {
    title: 'داشبورد',
    path: routesList.dashboard.url,
    icon: DashboardIcon,
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
  },
  {
    title: 'کاربران',
    path: routesList.access.url,
    icon: PersonIcon,
    confirmedRoles: [ROLE.SUPER_ADMIN],
  },
  {
    title: 'ربات',
    path: routesList.robot.url,
    icon: CodeIcon,
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
  },
  {
    title: 'آپلود',
    path: routesList.upload.url,
    icon: UploadIcon,
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
  },
  {
    title: 'آثار',
    path: '#',
    icon: SvgMusicIcon,
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    child: [
      {
        title: 'دسته بندی ها',
        path: routesList.categories.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
      {
        title: 'هنرمند',
        path: routesList.artist.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
      {
        title: 'لیست آثار',
        path: routesList.tracks.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
    ],
  },
  {
    title: 'پیام ها',
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    path: '#',
    icon: ChatBubbleIcon,
    child: [
      {
        title: 'درخواست ها',
        path: routesList.requests.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
      {
        title: 'پشتیبانی',
        path: routesList.tickets.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
    ],
  },
  {
    title: 'محتوا',
    icon: MobileIcon,
    path: '#',
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
    child: [
      {
        title: 'صفحه اصلی',
        path: routesList.landingContent.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
      {
        title: 'صفحه جستجو',
        path: routesList.searchContent.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
      {
        title: 'صفحه اعلان ها',
        path: routesList.notifications.url,
        confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.BASIC_USER],
      },
    ],
  },
  {
    title: 'پکیج ها',
    path: routesList.packages.url,
    icon: CubeIcon,
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
  },
  {
    title: 'کد های تخفیف',
    path: routesList.offerCodes.url,
    icon: SvgCouponsIcon,
    confirmedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
  },
];
