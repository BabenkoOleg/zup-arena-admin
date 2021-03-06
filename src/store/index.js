import Vue from 'vue';
import Vuex from 'vuex';

import { Message } from 'element-ui';

import instance from './instance';
import router from '../router';

import auth from './modules/auth';
import apiLogs from './modules/apiLogs';
import matches from './modules/matches';
import users from './modules/users';
import lootboxes from './modules/lootboxes';
import security from './modules/security';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    auth,
    apiLogs,
    matches,
    users,
    lootboxes,
    security,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${window.localStorage.getItem('jwt')}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.commit('auth/SET_IS_LOGGED_IN', false);
      store.commit('auth/CLEAR_JWT');
      Message({ message: 'Authorization required', type: 'error' });
      router.push({ name: 'AuthIndex' });
    }
    return Promise.reject(error);
  },
);

export default store;
