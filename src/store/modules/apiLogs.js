
import instance from '../instance';
import { actionTypes, actionsFactory } from '../restBase';

export { actionTypes };

export default {
  namespaced: true,

  state: {},

  actions: {
    ...actionsFactory('api-logs', instance),
  },
};
