import moment from 'moment-jalaali';

export function convertToStandardDateTime(date: string, time: string): Date {
  // Split the Persian (Jalali) date string into year, month, and day
  const [year, month, day] = date.split('/').map(part => parseInt(part, 10));

  // Create a moment object with the Persian (Jalali) date and time
  const combinedDateTime = moment(`${year}/${month}/${day} ${time}`, 'jYYYY/jMM/jDD HH:mm:ss').toDate();

  return combinedDateTime;
}
