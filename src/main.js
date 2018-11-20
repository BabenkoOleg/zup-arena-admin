import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import toDate from './plugins/toDate';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { locale });
Vue.use(toDate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
