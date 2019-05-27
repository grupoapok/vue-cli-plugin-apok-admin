import TOGGLE_SIDEBAR from './types';

export const showSidebar = ({ commit }) => commit(TOGGLE_SIDEBAR, true);
export const hideSidebar = ({ commit }) => commit(TOGGLE_SIDEBAR, false);
export const toggleSidebar = ({ commit }) => commit(TOGGLE_SIDEBAR);
