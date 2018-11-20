import Vue from 'vue';
import Router from 'vue-router';

import MatchesIndex from '@/views/Matches/Index';

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/matches',
      name: 'MatchesIndex',
      component: MatchesIndex,
    },
  ],
});
