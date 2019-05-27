import {
  RESET_FIELDS,
  DISMISS_MESSAGE,
  SEND_MESSAGE,
  SET_FIELDS,
} from './types';

export const sendMessage = (context, request) => {
  context.commit(SEND_MESSAGE, { ...request, id: new Date().getTime() });
};

export const dismissMessage = ({ commit }, messageId) => commit(DISMISS_MESSAGE, messageId);

export const resetFields = ({ commit }) => commit(RESET_FIELDS);

export const setFields = ({ commit }, fields) => commit(SET_FIELDS, fields);
