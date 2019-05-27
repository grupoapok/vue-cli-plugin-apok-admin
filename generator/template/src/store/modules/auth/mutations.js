import { GET_LOGGED_USER, LOGIN_USER, LOGOUT_USER } from './types';

export const initialState = {
  user: {
    name: '',
    email: '',
  },
  loading: false,
  loggedIn: false,
};

export const mutations = {
  [LOGIN_USER](state, payload) {
    switch (payload.meta) {
      case 'PENDING':
        state.loading = true;
        state.loggedIn = false;
        break;
      case 'ERROR':
        state.loading = false;
        state.loggedIn = false;
        state.user = { name: '', email: '' };
        break;
      case 'SUCCESS':
        state.loading = false;
        state.loggedIn = true;
        break;
      default:
        break;
    }
  },
  [GET_LOGGED_USER](state, { meta, data }) {
    switch (meta) {
      case 'SUCCESS':
        state.user = { ...data.data };
        state.loading = false;
        state.loggedIn = true;
        break;
      case 'ERROR':
        state.loading = false;
        break;
      case 'PENDING':
        state.loading = true;
        break;
      default:
        break;
    }
  },
  [LOGOUT_USER](state) {
    state.loading = false;
    state.loggedIn = false;
    state.user = { name: '', email: '' };
  },
};
