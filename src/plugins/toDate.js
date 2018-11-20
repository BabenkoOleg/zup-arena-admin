import moment from 'moment';

export default {
  install(Vue) {
    Vue.prototype.$toDate = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');
  },
};
