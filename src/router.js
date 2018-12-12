import Vue from 'vue';
import Router from 'vue-router';

import AuthIndex from '@/views/Auth/Index';

import ApiLogsIndex from '@/views/ApiLogs/Index';
import ApiLogsShow from '@/views/ApiLogs/Show';

import MatchesIndex from '@/views/Matches/Index';
import MatchesShow from '@/views/Matches/Show';

import UsersIndex from '@/views/Users/Index';
import UsersShow from '@/views/Users/Show';

import LootboxesIndex from '@/views/Lootboxes/Index';
import LootboxesForm from '@/views/Lootboxes/Form';

import SecurityShow from '@/views/Security/Show';

import store from '@/store';

const ifNotAuthenticated = (to, from, next) => {
  store.state.auth.isLoggedIn ? next({ name: 'MatchesIndex' }) : next();
};

const ifAuthenticated = (to, from, next) => {
  store.state.auth.isLoggedIn ? next() : next({ name: 'AuthIndex' });
};

Vue.use(Router);

export default new Router({
  base: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  mode: 'history',
  routes: [
    {
      path: '/sign-in',
      name: 'AuthIndex',
      component: AuthIndex,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/',
      alias: '/matches',
      name: 'MatchesIndex',
      component: MatchesIndex,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/matches/:id',
      name: 'MatchesShow',
      component: MatchesShow,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users',
      name: 'UsersIndex',
      component: UsersIndex,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/:id',
      name: 'UsersShow',
      component: UsersShow,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/api-logs',
      name: 'ApiLogsIndex',
      component: ApiLogsIndex,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/api-logs/:id',
      name: 'ApiLogsShow',
      component: ApiLogsShow,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/lootboxes',
      name: 'LootboxesIndex',
      component: LootboxesIndex,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/lootboxes/:id/edit',
      name: 'LootboxesEdit',
      component: LootboxesForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/lootboxes/new',
      name: 'LootboxesNew',
      component: LootboxesForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/security',
      name: 'SecurityShow',
      component: SecurityShow,
      beforeEnter: ifAuthenticated,
    },
  ],
});
