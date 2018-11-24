import Vue from 'vue';
import Vuex from 'vuex';

import matches from './modules/matches';
import users from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    matches,
    users,
  },
});

export default store;
