import instance from '../instance';

const endpoints = {
  INDEX: page => `matches?page=${page}`,
  SHOW: id => `matches/${id}`,
};

export const actionTypes = {
  INDEX: 'INDEX',
  SHOW: 'SHOW',
};

export const mutationTypes = {
  SET_MATCHES: 'SET_MATCHES',
  SET_MATCH: 'SET_MATCH',
};

export default {
  namespaced: true,

  state: {
    matches: [],
    page: 1,
    match: null,
  },

  actions: {
    [actionTypes.INDEX]({ commit }, { page }) {
      return instance.get(endpoints.INDEX(page))
        .then(({ data }) => commit(mutationTypes.SET_MATCHES, { matches: data.data }))
        .catch(error => Promise.reject(error));
    },
  },

  mutations: {
    [mutationTypes.SET_MATCHES](state, payload) {
      state.matches = payload.matches;
    },
  },
};
