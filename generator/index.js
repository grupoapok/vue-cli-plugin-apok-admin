/**
 * @file Initial configuration for the router, APIs and package.json
 * @author Apok
 */
const { EOL } = require("os");
const fs = require("fs");

/** @const mode {String} - Production mode for current project*/
const mode = "dev";

function fixStyles(options) {
  const stylesFile = './src/assets/main.scss';
  const cssFrameworkStyle = './src/assets/_variables.scss';

  let content = "";
  content += `\n@import '~@apok/admin-components-${options.cssFramework.toLowerCase()}/assets/components';`;

  switch(options.cssFramework.toLowerCase()){
    case 'bootstrap': {
      content += "\n@import '~bootstrap/dist/css/bootstrap.css';\n";
      break;
    }
    case 'bulma': {
      content += "\n@import '~bulma/css/bulma.css';\n";
      break;
    }
  }

  if (options.icons.indexOf('material') !== -1) {
    content += "\n@import url('https://fonts.googleapis.com/icon?family=Material+Icons');";
    content += "\n@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');";
  }

  if (options.icons.indexOf('mdi') !== -1) {
    content += "\n$mdi-font-path: '~@mdi/font/fonts';";
    content += "\n@import '~@mdi/font/scss/materialdesignicons';";
  }

  fs.appendFileSync(stylesFile, content);

  let styleContent = fs.readFileSync(cssFrameworkStyle, { encoding: "utf-8" });
  styleContent = styleContent.replace(
    "%FRAMEWORK%",
    options.cssFramework.toLowerCase()
  );
  fs.writeFileSync(cssFrameworkStyle, styleContent, { enconding: "utf-8" });
}

function networkPluginInstall(adminConfigFile, options) {
  let adminConfigContent = fs.readFileSync(adminConfigFile, {encoding: "utf-8" });

  //REST client install and config
  let restConfig = "";
  if (options.restClient) {
    restConfig = "Vue.use(NetworkRestPlugin, {\n" +
      " baseURL: 'your api URL goes here',\n" +
      " sessionCookie: constants.SESSION_COOKIE\n" +
      "});\n";
  }

  //GraphQL client install and config
  let graphConfig = "";
  if (options.graphQLClient) {
    graphConfig = "Vue.use(NetworkGraphQLPlugin, {\n" +
      " baseURL: 'your api URL goes here',\n" +
      " sessionCookie: constants.SESSION_COOKIE\n" +
      "});\n";
  }

  adminConfigContent = adminConfigContent.replace("REST_CONFIG", restConfig);
  adminConfigContent = adminConfigContent.replace("GRAPHQL_CONFIG", graphConfig);

  fs.writeFileSync(adminConfigFile, adminConfigContent, { encoding: "utf-8" });
}

function iconDependencies(options) {
  const deps = {};
  if (options.indexOf('fontawesome') !== -1) {
    deps["@fortawesome/fontawesome-svg-core"] = "^1.2.18";
    deps["@fortawesome/free-regular-svg-icons"] = "^5.8.2";
    deps["@fortawesome/free-solid-svg-icons"] = "^5.8.2";
    deps["@fortawesome/vue-fontawesome"] = "^0.1.6";
  }
  if (options.indexOf('mdi') !== -1) {
    deps["@mdi/font"] = "^3.6.95";
  }
  if (options.indexOf('unicons') !== -1) {
    deps['vue-unicons'] = '^2.1.0';
  }
  return deps;
}

function stylesDependencies(cssFramework) {
  if (cssFramework === 'bootstrap') {
    return {
      'bootstrap': "^4.4.1"
    }
  }
  if (cssFramework === 'bulma') {
    return {
      'bulma': '^0.8.2'
    }
  }
}
function networkDependencies(options) {
  let deps = {};
  /**REST API dependencies*/
  if (options.restClient) {
    deps["axios"] = "^0.19.2"
  }

  /**GraphQL API dependencies*/
  if (options.graphQLClient) {
    deps = {
      ...deps,
      "apollo-boost": "^0.3.1",
      "apollo-cache-inmemory": "^1.5.1",
      "apollo-client": "^2.5.1",
      "apollo-link-error": "^1.1.10",
      "apollo-link-http": "^1.5.14",
      "graphql": "^14.3.0",
      "graphql-tag": "^2.10.1"
    };
  }
  return deps;
}

/**
 * Updates the project's main package.json with apok-admin's dependencies and scripts
 * @param api {Object} - Global Object created by Vue-Cli. Refer to {@link https://cli.vuejs.org/dev-guide/generator-api.html#cliversion}
 * for more info about Vue-Cli API
 * @param options {Object} - Contains prompts.js answers
 */
function updatePackage(api, options) {
  let apokAdminVersion = "^0.1.1-rc.10";
  let apokAdminComponentsVersion = "^1.0.1-rc.15";

  /**Framework option chosen by user trough console*/
  const components = options.cssFramework.toLowerCase();

  if (mode === "dev") {
    apokAdminVersion = "file:../plugin_nuevo/apok-admin";
    apokAdminComponentsVersion = `file:../plugin_nuevo/apok-admin-components-${components}`;
  }

  /**Apok-admin necessary dependencies*/
  let dependencies = {
    "@apok/admin": apokAdminVersion,
    "@fortawesome/fontawesome-svg-core": "^1.2.18",
    "@fortawesome/free-regular-svg-icons": "^5.8.2",
    "@fortawesome/free-solid-svg-icons": "^5.8.2",
    "@fortawesome/vue-fontawesome": "^0.1.6",
    "@mdi/font": "^3.6.95",
    "core-js": "^3.6.4",
    "js-cookie": "^2.2.0",
    "lodash.camelcase": "^4.3.0",
    "lodash.clonedeep": "^4.5.0",
    "lodash.chunk": "^4.2.0",
    "moment": "^2.24.0",
    ...iconDependencies(options.icons),
    ...stylesDependencies(options.cssFramework),
    ...networkDependencies(options),
    "vue-router": "^3.0.3",
    "vuex": "^3.0.1",
    "vuex-i18n": "^1.11.0",
    "register-service-worker": "^1.6.2",
    "vue-chartjs": "^3.5.0",
    "chart.js": "^2.9.3"
  };

  /*Chosen CSS Components*/
  dependencies = {
    ...dependencies,
    [`@apok/admin-components-${components}`]: apokAdminComponentsVersion
  };

  /**Development dependencies*/
  api.extendPackage({
    dependencies,
    devDependencies: {
      "miragejs": "^0.1.40",
      "postcss-import": "^12.0.1",
      "node-sass": "^4.9.0",
      "sass-loader": "^7.1.0",
      "@vue/cli-plugin-unit-jest": "^4.4.1",
      "@vue/test-utils": "^1.0.3"
    },
    scripts: {
      create: "apok-admin-create"
    }
  });
}

function fixRoutesFile(options) {
  /**Contains path to the main router*/
  const routesFile = `./src/router.js`;

  let routesContent = fs.readFileSync(routesFile, { encoding: "utf-8" });
  routesContent = routesContent.replace(
    "%FRAMEWORK%",
    options.cssFramework.toLowerCase()
  );
  fs.writeFileSync(routesFile, routesContent, { encoding: "utf-8" });
}

module.exports = (api, options) => {
  const components = options.cssFramework[0].toUpperCase() + options.cssFramework.toLowerCase().slice(1);
  updatePackage(api, options);

  api.render("./template");

  api.injectImports(api.entryFile, `import ${components}AdminComponents from '@apok/admin-components-${components.toLowerCase()}';`);
  api.injectImports(api.entryFile, `import './config/index';`);
  api.injectImports(api.entryFile, `import router from './router';`);
  api.injectImports(api.entryFile, `import store from './store/index';`);
  api.injectRootOptions(api.entryFile, ["store", "router"]);
  fs.writeFileSync(api.entryFile, `\n\nVue.use(${components}AdminComponents, {});\n`);

  const adminConfigFile = 'src/config/admin.js';
  if (options.restClient) {
      api.injectImports(
        adminConfigFile,
        `import NetworkRestPlugin from "@apok/admin/vue/plugins/network/rest/NetworkRestPlugin";`
      );
    }
    if (options.graphQLClient) {
      api.injectImports(
        adminConfigFile,
        `import NetworkGraphQLPlugin from "@apok/admin/vue/plugins/network/graphql/NetworkGraphQLPlugin";`
      );
    }

  api.exitLog('Done!!', 'done');

  api.onCreateComplete(() => {
    fixStyles(options);
    fixRoutesFile(options);
    networkPluginInstall(adminConfigFile, options)
  });

  //console.log(api.genJSConfig(options));
};
