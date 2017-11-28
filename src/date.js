import moment from 'moment';

/**
 * Checks the specified date is equal to today or after.
 * @param {String} date
 * @returns {boolean}
 */
export const isAfterToday = (date) => {
  let valid = false;
  if (date) {
    const startDate = moment(date);
    if (startDate.diff(moment(), 'days') >= 0) {
      valid = true;
    }
  }

  return valid;
};
