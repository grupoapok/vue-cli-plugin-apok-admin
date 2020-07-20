import Vue from 'vue';
import {
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  DELETE_ITEM,
  GET_ITEM,
  GET_ITEM_LIST,
  RESET_ITEM,
  RESET_LIST,
  SAVE_ITEM,
} from '@/store/ListTypes';
import { processError } from "@/utils/functions";

export const getItemList = (context, params) =>
  Vue.$rest.executeVuexRequest(
    context,
    GET_ITEM_LIST,
    `CHANGE_ME?page=${params.page}&size=${params.size}`
  );

export const getItem = (context, id) =>
  Vue.$rest.executeVuexRequest(context, GET_ITEM, `CHANGE_ME/${id}`)
    .catch(error => processError(context, error));

export const saveItem = (context, object) => {
  let method = 'POST';
  let url = 'CHANGE_ME';
  if (!!object.id) {
    url = `CHANGE_ME/${object.id}`;
    method = 'PUT';
  }
  return new Promise((resolve, reject) => {
    Vue.$rest.executeVuexRequest(context, SAVE_ITEM, url, object, method)
      .then(response => {
        context.dispatch('messages/sendMessage', {
          type: 'success',
          text: 'success',
          id: new Date().getTime()
        }, { root: true });
        resolve(response);
      })
      .catch(error => {
        processError(context, error);
        reject(error);
      });
  });
};

export const deleteItem = (context, id) =>
  Vue.$rest.executeVuexRequest(context, DELETE_ITEM, `CHANGE_ME/${id}`, { id }, 'DELETE');

export const resetItem = (context) => context.commit(RESET_ITEM);

export const changePage = (context, page) => context.commit(CHANGE_PAGE, page);

export const changePageSize = (context, pageSize) => context.commit(CHANGE_PAGE_SIZE, pageSize);

export const resetList = (context) => context.commit(RESET_LIST);
