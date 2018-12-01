import instance from '../instance';

const endpoints = {
  INDEX: 'api-logs',
  SHOW: id => `api-logs/${id}`,
};

export const actionTypes = {
  INDEX: 'INDEX',
  SHOW: 'SHOW',
};

export default {
  namespaced: true,

  state: {},

  actions: {
    [actionTypes.INDEX]() {
      return instance.get(endpoints.INDEX)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.SHOW](context, { id }) {
      return instance.get(endpoints.SHOW(id))
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },
  },
};
