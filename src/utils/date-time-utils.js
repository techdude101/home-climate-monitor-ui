/**
 * Check if a given timestamp is more than one hour ago
 * @param {number} timestamp
 * @returns {boolean}
 */
export const isTimestampMoreThan1HourAgo = (timestamp) => {
  if (timestamp === undefined || timestamp == null) return true;
  const ONE_HOUR_IN_SECONDS = 60 * 60;

  const reading = new Date(timestamp);
  const readingUTC = dateToUTC(reading);
  const now = new Date();
  const nowUTC = dateToUTC(now);
  const timezoneOffset = now.getTimezoneOffset() * 60;
  const difference = (nowUTC - readingUTC) / 1000; // seconds

  if (difference + timezoneOffset > ONE_HOUR_IN_SECONDS) {
    return true;
  }
  return false;
};

/**
 * Convert Date object to unix timestamp
 * @param {Date} date - Date object
 * @returns {number} Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) and the specified date.
 */
export const dateToUTC = (date) => {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

/**
 * Format date to match user locale
 * @param {Date | string} date - Date object or ISO 8601 date time string
 * @returns {string | null} Formatted date and time as a string or null if an invalid date is passed
 */
export const formatDate = (date) => {
  if (!date) return null;
  // Get user locale from browser
  const locale = navigator.language;
  let dateTime = null;
  if (typeof date !== Object) {
    dateTime = new Date(date + "Z").getTime();
  } else {
    dateTime = new Date(date).getTime();
  }

  return new Intl.DateTimeFormat([locale, "en-GB"], {
    dateStyle: "short",
  }).format(dateTime);
};

/**
 * Format date and time to match user locale
 * @param {Date | string} date - Date object or ISO 8601 date time string
 * @returns {string | null} Formatted date and time as a string or null if an invalid date is passed
 */
export const formatDateTime = (date) => {
  if (!date) return null;
  // Get user locale from browser
  const locale = navigator.language;
  let dateTime = null;
  if (typeof date !== Object && typeof date === "string") {
    dateTime = new Date(date + "Z");
  } else {
    dateTime = new Date(date);
  }

  const formattedDateString = new Intl.DateTimeFormat([locale, "en-GB"], {
    dateStyle: "short",
  }).format(dateTime.getTime());
  const formattedTimeString = dateTime.toTimeString().split(" ")[0];

  return `${formattedDateString} ${formattedTimeString}`;
};

/**
 * Converts a Date object to a date string
 * @example
 * // returns 2023-02-01
 * dateObjectToDateString(new Date("2023-02-01T07:26:06.161Z"))
 * @param {Date} dateObject - Date object
 * @returns {string} date part of ISO 8601 date string
 */
export const dateObjectToDateString = (dateObject) => {
  const offset = dateObject.getTimezoneOffset();
  const dateWithOffset = new Date(dateObject.getTime() - offset * 60 * 1000);
  return dateWithOffset.toISOString().split("T")[0];
};

/**
 * Is a given Date object today
 * @param {Date} dateObject
 * @returns {boolean}
 */
export const isToday = (dateObject) => {
  const now = new Date();
  const dateTodayString = dateObjectToDateString(now);
  const dateObjectString = dateObjectToDateString(dateObject);
  return dateTodayString === dateObjectString;
};

/**
 * Format time to match user locale
 * @param {Date | string} date - Date object or ISO 8601 date time string
 * @returns {string | null} Formatted time as a string or null if an invalid date is passed
 */
export const formatTime = (date) => {
  if (!date) return null;
  let dateTime = null;
  if (typeof date !== Object) {
    dateTime = new Date(date + "Z");
  } else {
    dateTime = new Date(date);
  }

  //return new Intl.DateTimeFormat([locale, 'en-GB'], { timeStyle: 'long', hour12: false }).format(dateTime);
  // new Date("2022-03-27 02:01").toTimeString() -> "02:01:00 GMT+0100 (British Summer Time)"
  return dateTime.toTimeString().split(" ")[0];
};

/**
 * Insert gaps in an array of unix timestamps
 *
 * Inserts null values when a gap of more than <delta> milliseconds is detected
 * @param {number[]} timestamps - an array of unix timestamps
 * @param {number} delta - delta between timestamps in milliseconds
 * @returns {Array} - Returns a new array with null values inserted where gaps have been detected
 */
export const insertGaps = (timestamps, text, delta) => {
  let timestampsCopy = [...timestamps];
  let textValues = [...text];

  for (let index = 2; index < timestamps.length; index++) {
    if (Math.abs(timestamps[index] - timestamps[index - 1]) > delta) {
      timestampsCopy.splice(index - 1, 0, null);
      textValues.splice(index - 1, 0, null);
    }
  }
  return [timestampsCopy, textValues];
};
