import { mutations } from './baseMutations';
import * as actions from './baseActions';
export const storeGenerator = (
  extraActions = {},
  extraState = {},
  extraMutations = {}
) => {
  return {
    state: {
      list: {},
      pageSize: 20,
      loading: false,
      currentPage: 1,
      totalPages: 1,
      perPage: 1,
      currentItem: {},
      updating: false,
      ...extraState
    },
    actions: {...actions, ...extraActions },
    mutations: { ...mutations, ...extraMutations },
  };
};
