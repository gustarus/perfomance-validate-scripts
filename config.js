const merge = require('lodash.merge');
const getLocalConfig = require('./config.local');

module.exports = function() {
  const defaults = {
    client: {
      url: 'https://www.booking.com',
      json: false
    },

    filters: [
      src => src.includes('.bstatic.com')
    ],

    samples: [
      { path: '' },
      { path: '/searchresults.ru.html?label=gen173nr-1DCAEoggJCAlhYSDNiBW5vcmVmaMIBiAEBmAEhuAEHyAEM2AED6AEBkgIBeagCAw%3Bsid%3D4bf5a356f271985c9d8a7c2ea5c4eaaa&checkin_monthday=1&checkin_year_month=2018-01&checkout_monthday=7&checkout_year_month=2018-01&dest_id=-2960561&dest_type=city&group_adults=2&group_children=0&no_rooms=1&sb_travel_purpose=leisure&si=re' },
      { path: '/hotel/ru/izmailovo-alpha.ru.html?label=gen173nr-1DCAEoggJCAlhYSDNiBW5vcmVmaMIBiAEBmAEhuAEHyAEM2AED6AEBkgIBeagCAw;sid=4bf5a356f271985c9d8a7c2ea5c4eaaa;all_sr_blocks=17925501_89065253_0_42_0;checkin=2018-01-01;checkout=2018-01-07;dest_id=-2960561;dest_type=city;dist=0;group_adults=2;highlighted_blocks=17925501_89065253_0_42_0;hpos=4;room1=A%2CA;sb_price_type=total;srfid=b1d25c83db8e4fc008242bb51cf5b0ee1fa384e2X4;type=total;ucfs=1&#hotelTmpl' }
    ]
  };

  const local = getLocalConfig();
  return merge({}, defaults, local);
};
