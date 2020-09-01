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
import cloneDeep from "lodash.clonedeep";

const updateLoading = (state, currentMeta) => state.loading = currentMeta === 'PENDING';

export const mutations = {
  [GET_ITEM_LIST](state, payload) {
    updateLoading(state, payload.meta);
    if (payload.meta === 'SUCCESS') {
      if (payload.data.meta) {
        state.currentPage = Number.parseInt(payload.data.meta.current_page, 10);
        state.totalPages = Number.parseInt(payload.data.meta.last_page, 10);
        state.perPage = Number.parseInt(payload.data.meta.per_page, 10);
        state.totalRecords = Number.parseInt(payload.data.meta.total, 10);
      } else {
        state.currentPage = 1;
        state.totalPages = 1;
        state.perPage = payload.data.data.length;
        state.totalRecords = payload.data.data.length;
      }
      state.list[state.currentPage] = payload.data.data;
    }
  },
  [GET_ITEM](state, payload) {
    updateLoading(state, payload.meta);
    if (payload.meta === 'SUCCESS') {
      state.currentItem = payload.data.data;
    }
  },
  [SAVE_ITEM](state, payload) {
    updateLoading(state, payload.meta);
    switch (payload.meta) {
      case 'ERROR':
        state.updating = false;
        break;
      case 'PENDING':
        state.updating = !!payload.data.id;
        break;
      case 'SUCCESS': {
        const newList = cloneDeep(state.list);

        if (state.updating) {
          Object.keys(newList).forEach(page => {
            newList[page] = newList[page].map(item => {
              if (item.id === payload.data.data.id) {
                return payload.data.data;
              } else {
                return item;
              }
            })
          })
        } else {
          let added = false;
          Object.keys(newList).forEach(page => {
            if (newList[page].length < state.pageSize) {
              newList[page].push(payload.data.data);
              added = true
            }
          });
          if (!added) {
            if (Object.keys(state.list).length !== 0) {
              state.totalPages = state.totalPages + 1;
              state.currentPage = state.totalPages;
            }
            newList[state.currentPage] = [payload.data.data];
          }
        }
        state.updating = false;
        state.list = newList;

        break;
      }
    }
  },
  [DELETE_ITEM](state, payload) {
    switch (payload.meta) {
      case 'PENDING': {
        Object.keys(state.list).forEach(page => {
          state.list[page].filter(item => item.id === payload.data.id)
            .forEach(item => item.deleting = true)
        });
        break;
      }
      case 'SUCCESS': {
        const newList = cloneDeep(state.list);
        Object.keys(newList).forEach(page => {
          newList[page] = newList[page].filter(item => !item.deleting)
        });
        state.list = newList;
        break;
      }
      case 'ERROR': {
        Object.keys(state.list).forEach(page => {
          state.list[page].forEach(item => item.deleting = false);
        });
        break;
      }
    }
  },
  [RESET_ITEM](state) {
    state.currentItem = {}
  },
  [CHANGE_PAGE](state, payload) {
    state.currentPage = payload;
  },
  [CHANGE_PAGE_SIZE](state, payload) {
    state.pageSize = payload;
  },
  [RESET_LIST](state) {
    state.currentPage = 1;
    state.totalPages = 1;
    state.totalRecords = 0;
    state.list = {};
  },
};
