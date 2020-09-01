import { mutations } from './baseMutations';

export const storeGenerator = (
  actions,
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
    actions,
    mutations: { ...mutations, ...extraMutations },
  };
};
