import moment from 'moment';

/**
 * Checks the specified date is equal to today or after.
 * @param {String} date
 * @param {String} dateFormat
 * @returns {boolean}
 */
export const isAfterToday = (date, dateFormat = 'YYYY-MM-DD') => {
  let valid = false;
  if (date) {
    const startDate = moment(date, dateFormat);
    if (startDate.diff(moment(), 'days') >= 0) {
      valid = true;
    }
  }

  return valid;
};
