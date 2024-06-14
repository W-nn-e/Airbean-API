const moment = require('moment-timezone');

const timezone = 'Europe/Stockholm';

exports.addMinutesToDate = () => {
  return moment().tz(timezone).add(15, 'minutes').add(2, 'hours').toDate();
};
