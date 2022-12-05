    export const isTimestampMoreThan1HourAgo = (timestamp=null) => {
      if (timestamp === undefined || timestamp == null) return true;
      const reading = new Date(timestamp);
      const readingUTC = dateToUTC(reading);
      const now = new Date();
      const nowUTC = dateToUTC(now);
      const timezoneOffset = now.getTimezoneOffset();
      const difference = (nowUTC - readingUTC) / 1000; // seconds

      // 60 seconds * 60 minutes
      if (difference + timezoneOffset > (60 * 60)) {
        return true;
      }
      return false;
  };

  export const dateToUTC = (d) => {
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
  }

  export const formatDate = (date) => {
    if (!date) return null;
    // Get user locale from browser
    const locale = navigator.language;
    let dateTime = new Date(date + 'Z');
    
    return new Intl.DateTimeFormat([locale, 'en-GB'], { dateStyle: 'short', timeStyle: 'long', hour12: false }).format(dateTime);
  };

  export const dateObjectToDate = (dateObject)  => {
    const offset = dateObject.getTimezoneOffset()
    const dateWithOffset = new Date(dateObject.getTime() - (offset * 60 * 1000));
    return dateWithOffset.toISOString().split('T')[0]
  }

  export const isToday = (dateObject) => {
    const now = new Date();
    const dateTodayString = dateObjectToDate(now);
    const dateObjectString = dateObjectToDate(dateObject);
    return (dateTodayString === dateObjectString);
  }

  export const formatTime = (date) => {
    if (!date) return null;
    const locale = navigator.language;
    let dateTime = null;
    if (typeof date !== Object) {
      dateTime = new Date(date + 'Z');
    } else {
      dateTime = new Date(date);
    }

    return new Intl.DateTimeFormat([locale, 'en-GB'], { timeStyle: 'long', hour12: false }).format(dateTime);
  };
