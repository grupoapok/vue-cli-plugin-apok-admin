import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import store from '@/store';
import translations from '@/i18n';
import constants from './constants';

Vue.use(vuexI18n.plugin, store);

Object.keys(translations).forEach((lang) => {
  Vue.i18n.add(lang, translations[lang]);
});

Vue.i18n.set(constants.DEFAULT_LANG);
Vue.i18n.fallback(constants.DEFAULT_LANG);
