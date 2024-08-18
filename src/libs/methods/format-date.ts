import { formatDistance } from 'date-fns-jalali';
import moment from 'moment-jalaali';

export const fromNow = (time: string) =>
  formatDistance(new Date(time), new Date(), {
    addSuffix: false,
  });
export const formatDate = (time: string) => moment(time).format('jYYYY/jM/jD');
