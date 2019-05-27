import Vue from "vue";
import Vuex from "vuex";
import camelCase from "lodash.camelcase";

Vue.use(Vuex);

const requireModule = require.context(".", true, /index\.js$/);
const modules = [];

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return;

  const moduleName = camelCase(fileName.replace(/(\.\/|index\.js)/g, ""));

  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  };
});

const requireFeatureModule = require.context("@/features",true,/store\/index\.js$/);

requireFeatureModule.keys().forEach(fileName => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\/store\/index\.js)/g,""))
  modules[moduleName] = {
    namespaced: true,
    ...requireFeatureModule(fileName).default
  }
});

export default modules;
