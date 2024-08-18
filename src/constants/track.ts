export const translateTrackKey = (key: string): string => {
  const translations: { [key: string]: string } = {
    id: 'شناسه - آیدی',
    name: 'نام',
    originalTitle: 'عنوان اصلی (مرجع)',
    hashTitle: 'آیدی عنوان به صورت یکتا',
    latinName: 'نام انگلیسی',
    description: 'توضیحات',
    origin: 'سرویس مرجع',
    originAudio: 'آدرس فایل مرجع',
    originUrl: 'آدرس سایت مرجع',
    category: 'دسته‌بندی',
    // date: 'تاریخ',
    // channel: 'کانال',
    // summary: 'خلاصه',
    // season: 'فصل',
    // episode: 'قسمت',
    rowNumber: 'شماره ردیف در فایل آپلودی',
    slug: 'اسلاگ',
    image: 'تصویر',
    isPremium: 'اشتراکی',
    isActive: 'فعال',
    createdBy: 'ایجاد شده توسط',
    createdAt: 'تاریخ ایجاد',
    updatedAt: 'تاریخ به‌روزرسانی',
    isDuplicate: 'تکراری',
    originalTrackId: 'شناسه اثر اصلی',
    modeId: 'مود اثر',
    artistId: 'شناسه هنرمند',
    uploadId: 'شناسه آپلود',
  };

  return translations[key] || key;
};
