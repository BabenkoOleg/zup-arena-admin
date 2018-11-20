import Vue from 'vue';
import Vuex from 'vuex';

import matches from './modules/matches';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    matches,
  },
});

export default store;
