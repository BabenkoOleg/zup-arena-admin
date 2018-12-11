export const actionTypes = {
  INDEX: 'INDEX',
  SHOW: 'SHOW',
  NEW: 'NEW',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  UPDATE: 'UPDATE',
  DESTROY: 'DESTROY',
};

export const actionsFactory = (endpoint, instance) => {
  const endpoints = {
    index: () => endpoint,
    show: id => `${endpoint}/${id}`,
    new: () => `${endpoint}/new`,
    create: () => endpoint,
    edit: id => `${endpoint}/${id}/edit`,
    update: id => `${endpoint}/${id}`,
    destroy: id => `${endpoint}/${id}`,
  };

  return {
    [actionTypes.INDEX]() {
      return instance.get(endpoints.index())
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.SHOW](context, { id }) {
      return instance.get(endpoints.show(id))
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.NEW]() {
      return instance.get(endpoints.new())
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.CREATE](context, { body }) {
      return instance.post(endpoints.create(), body)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.EDIT](context, { id }) {
      return instance.get(endpoints.edit(id))
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.UPDATE](context, { id, body }) {
      return instance.put(endpoints.update(id), body)
        .then(({ data }) => Promise.resolve(data.data))
        .catch(error => Promise.reject(error));
    },

    [actionTypes.DESTROY](context, { id }) {
      return instance.delete(endpoints.destroy(id))
        .then(() => Promise.resolve())
        .catch(error => Promise.reject(error));
    },
  };
};
