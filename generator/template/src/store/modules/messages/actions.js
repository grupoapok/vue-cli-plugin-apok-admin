import {
  RESET_FIELDS,
  DISMISS_MESSAGE,
  SEND_MESSAGE,
  SET_FIELDS,
} from './types';

/**
 *
 *@function sendMessage
 * @param context {Object} - Vuex instance context Object
 * @param request {Any} - mutation payload
 */
export const sendMessage = (context, request) => {
  context.commit(SEND_MESSAGE, { ...request, id: new Date().getTime() });
};

/**
 * @function dismissMessage
 * @param commit {Function} - destructured context.commit function
 * @param messageId {Payload} - mutation payload
 */
export const dismissMessage = ({ commit }, messageId) => commit(DISMISS_MESSAGE, messageId);

/**
 * @function resetFields
 * @param commit {Function} - destructured context.commit function
 */
export const resetFields = ({ commit }) => commit(RESET_FIELDS);

/**
 * @function setFields
 * @param commit {Function} - destructured context.commit function
 * @param fields {Payload} - mutations payload
 */
export const setFields = ({ commit }, fields) => commit(SET_FIELDS, fields);
