import TOGGLE_SIDEBAR from './types';

/**
 * @function showSidebar
 * @param commit {Function} - destructured context.commit function
 */
export const showSidebar = ({ commit }) => commit(TOGGLE_SIDEBAR, true);
/**
 * @function hideSidebar
 * @param commit - destructured context.commit function
 */
export const hideSidebar = ({ commit }) => commit(TOGGLE_SIDEBAR, false);
/**
 * @function toggleSidebar
 * @param commit {Function} - destructured context.commit function 
 */
export const toggleSidebar = ({ commit }) => commit(TOGGLE_SIDEBAR);
