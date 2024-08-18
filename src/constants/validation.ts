export const validationErrors = {
  required: 'این فیلد اجباری است',
  email: 'ایمیل وارد شده معتبر نیست',
  minLength: (min: number) => {
    return `حداقل ${min} کاراکتر وارد کنید`;
  },
  maxLength: (max: number) => {
    return `حداکثر ${max} کاراکتر وارد کنید`;
  },
  minNumber: (min: number) => {
    return `باید ${min} یا بیشتر باشد`;
  },
  image: {
    required: 'تصویر الزامی است!',
  },
  url: 'آدرس وارد شده معتبر نیست',
};
