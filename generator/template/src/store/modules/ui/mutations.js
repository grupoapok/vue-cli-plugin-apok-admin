import TOGGLE_SIDEBAR from './types';

export const initialState = {
  sidebarExpanded: true,
};

export const mutations = {
  [TOGGLE_SIDEBAR](state, payload) {
    if (payload !== undefined) {
      state.sidebarExpanded = payload;
    } else {
      state.sidebarExpanded = !state.sidebarExpanded;
    }
  },
};
