import OlaApi from '../../Services/OlaApi';

export const schedule = {
  key: 'scheduleList',

  getList() {
    let list = localStorage.getItem(this.key)
    if (list) {
      list = JSON.parse(list);
      list = list.filter((item) => { return item.name; });
      return list;
    } else {
      return [];
    }
  },

  add(item) {
    let list = this.getList();
    item.id = list.length;
    list.push(item);
    localStorage.setItem(this.key, JSON.stringify(list));
    return;
  },

  silentNotification(item_id) {
    let list = this.getList();
    let item = list[item_id];
    item.silentNotification = true;
    localStorage.setItem(this.key, JSON.stringify(list));
    return;
  }
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
  const diff = (Date.now() - time);
  const threshold = 5 * 60 * 1000;
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
    function check() {
      let list = schedule.getList();
      for (let idx = 0; idx < list.length; idx += 1) {
        let item = list[idx];
        if (item.silentNotification) { continue; }
        if (canRequestCab(item.time)) {
          const lat = '12.950072'; // FIXME: remove hardcoded values
          const long = '77.642684';
          checkOlaCab({lat, long}).then((cabDetails) => {
            if (cabDetails) {
              clearInterval(activeTimer);
              return cb({cab: cabDetails, schedule_item: item});
            }
          });
        }
      }
    }
    activeTimer = setInterval(check, 5000);
  },
};
