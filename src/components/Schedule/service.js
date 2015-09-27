import OlaApi from '../../Services/OlaApi';

const schedule = {
  getList() {
    list = localStorage.getItem('scheduleList')
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }
};

function checkOlaCab({lat, long}) {
  OlaApi.client(`/products?pickup_lat=${lat}&pickup_long=${long}`, 'GET')
  .then(({categories}) => {
    return categories[0];
  })
}

function canRequestCab(time) {
  const diff = (time - Date.now());
  const threshold = 10000;
  if (diff < threshold) {
    return true;
  } else {
    return false;
  }
}

export default {
  start(cb) {
    let list = schedule.getList();
    for (let idx = 0; i < list.length; idx += 1) {
      let item = list[idx];
      if (canRequestCab(item.time)) {
        const lat = '12.950072'; // FIXME: remove hardcoded values
        const long = '77.642684';
        checkOlaCab({lat, long}).then((cabDetails) => {
          if (cabDetails) {
            cb({cab: cabDetails, schedule: item});
          }
        });
      }
    }
  },
};
