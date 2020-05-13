import Cookies from 'js-cookie';
import constants from '@/config/constants';
import { GET_LOGGED_USER, LOGIN_USER, LOGOUT_USER } from './types';
import {executeVuexRequest} from '@/tests/unit/networkFunctions'

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
  executeVuexRequest(context, LOGIN_USER, 'login', loginData, 'post')
     .then(response => {
       Cookies.set(constants.SESSION_COOKIE, response.access_token);
       context.dispatch('getUser');
     })
     .catch(error => {
       if (error.status === 401) {
         context.dispatch('messages/setFields', { username: error.body.message }, { root: true });
       }
     });
};

/**
 * Retrieves logged in user's data
 * @function getUser
 * @param context {Object}- Vuex context Object
 * @returns {Promise}
 */
export const getUser = (context) => executeVuexRequest(context, GET_LOGGED_USER, 'profile');

/**
 *Method that removes session cookie and logs out an user
 * @function logout
 * @param commit {Function} - commit function from Vuex
 */
export const logout = ({ commit }) => {
  Cookies.remove(constants.SESSION_COOKIE);
  commit(LOGOUT_USER);
};
