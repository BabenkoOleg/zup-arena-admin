import instance from '../instance';

const endpoints = {
  USERS: 'users',
  USER: id => `users/${id}`,
};

export const actionTypes = {
  INDEX: 'INDEX',
  SHOW: 'SHOW',
  UPDATE: 'UPDATE',
};

export default {
  namespaced: true,

  state: {},

  actions: {
    [actionTypes.INDEX]() {
      return instance.get(endpoints.USERS)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.SHOW](context, { id }) {
      return instance.get(endpoints.USER(id))
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.UPDATE](context, { id, params }) {
      return instance.put(endpoints.USER(id), params)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },
  },
};
