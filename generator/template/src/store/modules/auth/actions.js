import Vue from 'vue';
import Cookies from 'js-cookie';
import constants from '@/config/constants';
import router from '@/router';
import { GET_LOGGED_USER, LOGIN_USER, LOGOUT_USER } from './types';

export const doLogin = (context, { username, password }) => {
  const loginData = {
    email: username,
    password,
    grant_type: 'password',
    client_id: constants.CLIENT_ID,
    client_secret: constants.CLIENT_SECRET,
  };
  Vue.$rest.executeVuexAction(context, LOGIN_USER, 'login', loginData, 'post')
     .then(response => {
       Cookies.set(constants.SESSION_COOKIE, response.access_token);
       router.push({ name: 'Dashboard' });
       context.dispatch('getUser');
     })
     .catch(error => {
       if (error.status === 401) {
         context.dispatch('messages/setFields', { username: error.body.message }, { root: true });
       }
     });
};

export const getUser = (context) => Vue.$rest.executeVuexAction(context, GET_LOGGED_USER, 'profile');

export const logout = ({ commit }) => {
  Cookies.remove(constants.SESSION_COOKIE);
  commit(LOGOUT_USER);
  router.push({ name: 'Login' });
};
