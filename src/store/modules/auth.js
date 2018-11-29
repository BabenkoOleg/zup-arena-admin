import instance from '../instance';

const endpoints = {
  CREATE: '/auth',
  DESTROY: '/auth',
};

export const actionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

export const mutationTypes = {
  SET_JWT: 'SET_JWT',
  SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN',
  CLEAR_JWT: 'CLEAR_JWT',
};

export default {
  namespaced: true,

  state: {
    isLoggedIn: !!localStorage.getItem('jwt'),
  },

  actions: {
    [actionTypes.SIGN_IN]({ commit }, { login, password }) {
      return instance.post(endpoints.CREATE, { login, password })
        .then(({ data }) => {
          commit(mutationTypes.SET_JWT, data.jwt);
          commit(mutationTypes.SET_IS_LOGGED_IN, true);
          return Promise.resolve('Signed in successfully');
        });
    },

    [actionTypes.SHOW](context, { id }) {
      return instance.get(endpoints.SHOW(id))
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },
  },

  mutations: {
    [mutationTypes.SET_JWT](state, jwt) {
      localStorage.setItem('jwt', jwt);
    },

    [mutationTypes.SET_IS_LOGGED_IN](state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },

    [mutationTypes.CLEAR_JWT]() {
      localStorage.removeItem('jwt');
    },
  },
};
