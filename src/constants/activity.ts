export enum AuthorActionEnum {
  LOGIN = 'LOGIN',
  createArtist = 'CREATE_ARTIST',
  updateArtist = 'UPDATE_ARTIST',
  updateArtistDraft = 'UPDATE_ARTIST_DRAFT',
  deleteArtist = 'DELETE_ARTIST',
  approveCreateArtist = 'APPROVE_CREATE_ARTIST',
  rejectCreateArtist = 'REJECT_CREATE_ARTIST',
  createArtistPlaylist = 'CREATE_ARTIST_PLAYLIST',
  createArtistPlaylistDraft = 'CREATE_ARTIST_PLAYLIST_DRAFT',
  updateArtistPlaylist = 'UPDATE_ARTIST_PLAYLIST',
  updateArtistPlaylistDraft = 'UPDATE_ARTIST_PLAYLIST_DRAFT',
  deleteArtistPlaylist = 'DELETE_ARTIST_PLAYLIST',
  approveCreateArtistPlaylist = 'APPROVE_CREATE_ARTIST_PLAYLIST',
  approveUpdateArtistPlaylist = 'APPROVE_UPDATE_ARTIST_PLAYLIST',
  approveDeleteArtistPlaylist = 'APPROVE_DELETE_ARTIST_PLAYLIST',
  rejectCreatArtistPlaylist = 'REJECT_CREATE_ARTIST_PLAYLIST',
  rejectUpdateArtistPlaylist = 'REJECT_UPDATE_ARTIST_PLAYLIST',
  rejectDeleteArtistPlaylist = 'REJECT_DELETE_ARTIST_PLAYLIST',
  createAuthor = 'CREATE_AUTHOR',
  createCategory = 'CREATE_CATEGORY',
  createSubCategory = 'CREATE_SUB_CATEGORY',
  uploadFile = 'UPLOAD_FILE',
  activeBot = 'ACTIVE_BOT',
  deactiveBot = 'DEACTIVE_BOT',
  createEvent = 'CREATE_EVENT',
  updateEvent = 'UPDATE_EVENT',
  deleteEvent = 'DELETE_EVENT',
}

export enum DraftActionEnum {
  create = 'CREATE',
  update = 'UPDATE',
  delete = 'DELETE',
}

export enum DraftEnum {
  artist = 'ARTIST',
  artistPlaylist = 'PLAYLIST',
}

export enum ApprovalStatusEnum {
  pending = 'PENDING',
  approved = 'APPROVED',
  rejected = 'REJECTED',
}

export const mapActivityAction = (action: AuthorActionEnum): string => {
  switch (action) {
    case AuthorActionEnum.LOGIN:
      return 'ورود به پنل';
    case AuthorActionEnum.createArtist:
      return 'ایجاد هنرمند';
    case AuthorActionEnum.updateArtist:
      return 'به‌روزرسانی هنرمند';
    case AuthorActionEnum.updateArtistDraft:
      return 'به‌روزرسانی پیش‌نویس هنرمند';
    case AuthorActionEnum.deleteArtist:
      return 'حذف هنرمند';
    case AuthorActionEnum.approveCreateArtist:
      return 'تأیید ایجاد هنرمند';
    case AuthorActionEnum.rejectCreateArtist:
      return 'رد ایجاد هنرمند';
    case AuthorActionEnum.createArtistPlaylist:
      return 'ایجاد لیست پخش هنرمند';
    case AuthorActionEnum.createArtistPlaylistDraft:
      return 'ایجاد پیش‌نویس لیست پخش هنرمند';
    case AuthorActionEnum.updateArtistPlaylist:
      return 'به‌روزرسانی لیست پخش هنرمند';
    case AuthorActionEnum.updateArtistPlaylistDraft:
      return 'به‌روزرسانی پیش‌نویس لیست پخش هنرمند';
    case AuthorActionEnum.deleteArtistPlaylist:
      return 'حذف لیست پخش هنرمند';
    case AuthorActionEnum.approveCreateArtistPlaylist:
      return 'تأیید ایجاد لیست پخش هنرمند';
    case AuthorActionEnum.approveUpdateArtistPlaylist:
      return 'تأیید به‌روزرسانی لیست پخش هنرمند';
    case AuthorActionEnum.approveDeleteArtistPlaylist:
      return 'تأیید حذف لیست پخش هنرمند';
    case AuthorActionEnum.rejectCreatArtistPlaylist:
      return 'رد ایجاد لیست پخش هنرمند';
    case AuthorActionEnum.rejectUpdateArtistPlaylist:
      return 'رد به‌روزرسانی لیست پخش هنرمند';
    case AuthorActionEnum.rejectDeleteArtistPlaylist:
      return 'رد حذف لیست پخش هنرمند';
    case AuthorActionEnum.createAuthor:
      return 'ایجاد کاربر';
    case AuthorActionEnum.createCategory:
      return 'ایجاد دسته‌بندی';
    case AuthorActionEnum.createSubCategory:
      return 'ایجاد زیر دسته بندی';
    case AuthorActionEnum.uploadFile:
      return 'بارگذاری فایل';
    case AuthorActionEnum.activeBot:
      return 'فعال کردن ربات';
    case AuthorActionEnum.deactiveBot:
      return 'غیرفعال کردن ربات';
    case AuthorActionEnum.createEvent:
      return 'ایجاد رویداد';
    case AuthorActionEnum.updateEvent:
      return 'به‌روزرسانی رویداد';
    case AuthorActionEnum.deleteEvent:
      return 'حذف رویداد';
    default:
      return 'عملیات ناشناخته';
  }
};
