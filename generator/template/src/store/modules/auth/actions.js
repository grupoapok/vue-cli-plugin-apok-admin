import vue from 'vue';
import Cookies from 'js-cookie';
import constants from '@/config/constants';
import { GET_LOGGED_USER, LOGIN_USER, LOGOUT_USER } from './types';

/**
 * Login function via API REST
 *@function doLogin
 * @param context {Object} - Vuex context Object
 * @param user {Object} - User data object for login
 * @param user.username {String} - User's username for log in
 * @param user.password {String} - User's password for log in
 */
export const doLogin = (context, { username, password }) => {
  const loginData = {
    email: username,
    password,
    grant_type: 'password',
    client_id: constants.CLIENT_ID,
    client_secret: constants.CLIENT_SECRET,
  };
  return vue.$rest.executeVuexRequest(context, LOGIN_USER, 'login', loginData, 'post')
};

/**
 * Retrieves logged in user's data
 * @function getUser
 * @param context {Object}- Vuex context Object
 * @returns {Promise}
 */
export const getUser = (context) => vue.$rest.executeVuexRequest(context, GET_LOGGED_USER, 'profile');
/**
 *Method that removes session cookie and logs out an user
 * @function logout
 * @param commit {Function} - commit function from Vuex
 */
export const logout = ({ commit }) => {
  Cookies.remove(constants.SESSION_COOKIE);
  commit(LOGOUT_USER);
};
