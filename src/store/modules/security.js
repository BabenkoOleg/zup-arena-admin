import instance from '../instance';

const endpoint = 'security';

export const actionTypes = {
  EDIT: 'EDIT',
  UPDATE: 'UPDATE',
};

export const mutationTypes = {
  SET_JWT: 'SET_JWT',
  SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN',
  CLEAR_JWT: 'CLEAR_JWT',
};

export default {
  namespaced: true,
  state: {},
  actions: {
    [actionTypes.EDIT]() {
      return instance.get(endpoint)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.UPDATE](context, { body }) {
      return instance.put(endpoint, body)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },
  },
};
