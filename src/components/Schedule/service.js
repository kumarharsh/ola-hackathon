import OlaApi from '../../Services/OlaApi';

export const schedule = {
  key: 'scheduleList',

  getList() {
    let list = localStorage.getItem(this.key)
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  },

  add(item) {
    let list = this.getList();
    list.push(item);
    localStorage.setItem(this.key, JSON.stringify(list));
    return;
  },
};

function checkOlaCab({lat, long}) {
  return OlaApi.client.api(`/v1/products?pickup_lat=${lat}&pickup_lng=${long}`, 'GET')
  .then((res) => { return res.json(); })
  .then(({categories}) => {
    if(!categories) {
      return null;
    } else {
      return categories[0];
    }
  });
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

let activeTimer = null;

export default {
  start(cb) {
    if (activeTimer) {
      clearInterval(activeTimer);
    }
    let list = schedule.getList();
    function check() {
      for (let idx = 0; idx < list.length; idx += 1) {
        let item = list[idx];
        if (canRequestCab(item.time)) {
          const lat = '12.950072'; // FIXME: remove hardcoded values
          const long = '77.642684';
          checkOlaCab({lat, long}).then((cabDetails) => {
            if (cabDetails) {
              return cb({cab: cabDetails, schedule: item});
            }
          });
        }
      }
    }
    activeTimer = setInterval(check, 5000);
  },
};
