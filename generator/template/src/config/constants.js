import Vue from 'vue';

/**
 * Object that contains global constants for project
 * @type {{PAGINATION_DATA: string, DEFAULT_LANG: (*|string), CLIENT_SECRET: *, PAGINATION_TOTAL_PAGES: string, API_URL: *, CLIENT_ID: *, PAGINATION_PER_PAGE: string, APP_NAME: (*|string), SESSION_COOKIE: (*|string), SHORT_APP_NAME: (*|string), PAGINATION_META: string, PAGINATION_CURRENT_PAGE: string}}
 */
const constants = {
  APP_NAME: process.env.VUE_APP_APP_NAME || 'Apok Admin',
  SHORT_APP_NAME: process.env.VUE_APP_SHORT_APP_NAME || 'AA',
  SESSION_COOKIE: process.env.VUE_APP_SESSION_COOKIE || 'apok.admin.session',
  API_URL: process.env.VUE_APP_API_URL,
  CLIENT_ID: process.env.VUE_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.VUE_APP_CLIENT_SECRET,
  PAGINATION_META: "meta",
  PAGINATION_DATA: "data",
  PAGINATION_CURRENT_PAGE: "current_page",
  PAGINATION_TOTAL_PAGES: "last_page",
  PAGINATION_PER_PAGE: "per_page",
  DEFAULT_LANG: process.env.VUE_APP_DEFAULT_LANG || 'en'
};

Vue.use({
  install(Vue) {
    Vue.$constants = constants;
    Vue.prototype.$constants = constants;
  }
});

export default constants;
