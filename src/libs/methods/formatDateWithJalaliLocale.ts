import moment from 'moment-jalaali';

moment.loadPersian({ usePersianDigits: true });

export function formatDateWithJalaliLocale(dateValue: Date): {
  dayNumber: number;
  dayString: string;
  month: string;
  year: string;
} {
  const formattedDate = moment(dateValue).locale('fa').format('jD dddd jMMMM jYYYY');
  const [dayNumber, dayString, month, year] = formattedDate.split(' ');

  return {
    dayNumber: parseInt(dayNumber),
    dayString,
    month,
    year,
  };
}
