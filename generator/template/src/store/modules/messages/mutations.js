import {
  SET_FIELDS,
  RESET_FIELDS,
  SEND_MESSAGE,
  DISMISS_MESSAGE,
} from './types';

export const initialState = {
  messages: [],
  fields: {},
};

export const mutations = {
  [SEND_MESSAGE](state, payload) {
    const { fields, ...messageProps } = payload;
    const newMessage = { ...messageProps };
    state.messages.push(newMessage);
    state.fields = { ...fields };
  },
  [DISMISS_MESSAGE](state, id) {
    state.messages = state.messages.filter(m => m.id !== id);
  },
  [SET_FIELDS](state, payload) {
    state.fields = { ...payload };
  },
  [RESET_FIELDS](state) {
    state.fields = {};
  },
};
