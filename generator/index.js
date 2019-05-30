const { EOL } = require("os");
const fs = require("fs");

const mode = "prod";

function updateNetworkConfig(adminConfigFile, options) {
  let adminConfigContent = fs.readFileSync(adminConfigFile, {encoding: "utf-8" });

  let restConfig = "";
  if (options.restClient) {
    restConfig = `Vue.use(NetworkRestPlugin, {${EOL}\tbaseUrl: '${options.restBaseUrl}',${EOL}\tsessionCookie: constants.SESSION_COOKIE${EOL}});${EOL}`;
  }

  let graphConfig = "";
  if (options.graphQLClient) {
    graphConfig = `Vue.use(NetworkGraphQLPlugin, {${EOL}\tbaseUrl: '${options.restBaseUrl}',${EOL}\tsessionCookie: constants.SESSION_COOKIE${EOL}});${EOL}`;
  }

  adminConfigContent = adminConfigContent.replace("REST_CONFIG", restConfig);
  adminConfigContent = adminConfigContent.replace("GRAPHQL_CONFIG", graphConfig);

  fs.writeFileSync(adminConfigFile, adminConfigContent, { encoding: "utf-8" });
}

function fixRoutesFile(options) {
  const routesFile = `./src/router.js`;
  let routesContent = fs.readFileSync(routesFile, { encoding: "utf-8" });
  routesContent = routesContent.replace(
    "%FRAMEWORK%",
    options.cssFramework.toLowerCase()
  );
  fs.writeFileSync(routesFile, routesContent, { encoding: "utf-8" });
}

function updatePackage(api, options) {
  let apokAdminVersion = "^0.1.1-rc.7";
  let apokAdminComponentsVersion = "^1.0.1-rc.9";

  const components = options.cssFramework.toLowerCase();

  if (mode === "dev") {
    apokAdminVersion = "file:~/inventos/apok-admin";
    apokAdminComponentsVersion = `file:~/inventos/apok-admin-components-${components}`;
  }

  let dependencies = {
    "@apok/admin": apokAdminVersion,
    "@fortawesome/fontawesome-svg-core": "^1.2.18",
    "@fortawesome/free-regular-svg-icons": "^5.8.2",
    "@fortawesome/free-solid-svg-icons": "^5.8.2",
    "@fortawesome/vue-fontawesome": "^0.1.6",
    "@mdi/font": "^3.6.95",
    "core-js": "^2.6.5",
    "js-cookie": "^2.2.0",
    "lodash.camelcase": "^4.3.0",
    "lodash.clonedeep": "^4.5.0",
    "moment": "^2.24.0",
    "vue-router": "^3.0.3",
    "vuex": "^3.0.1",
    "vuex-i18n": "^1.11.0",
    "register-service-worker": "^1.6.2"
  };

  if (options.restClient) {
    dependencies = {
      ...dependencies,
      "vue-resource": "^1.5.1"
    };
  }

  if (options.graphQLClient) {
    dependencies = {
      ...dependencies,
      "apollo-boost": "^0.3.1",
      "apollo-cache-inmemory": "^1.5.1",
      "apollo-client": "^2.5.1",
      "apollo-link-error": "^1.1.10",
      "apollo-link-http": "^1.5.14",
      graphql: "^14.3.0",
      "graphql-tag": "^2.10.1"
    };
  }

  dependencies = {
    ...dependencies,
    [`@apok/admin-components-${components}`]: apokAdminComponentsVersion
  };

  api.extendPackage({
    dependencies,
    devDependencies: {
      "postcss-import": "^12.0.1",
      "node-sass": "^4.9.0",
      "sass-loader": "^7.1.0"
    },
    scripts: {
      create: "apok-admin-create"
    }
  });
}

module.exports = (api, options) => {
  updatePackage(api, options);

  api.render("./template");

  api.injectImports(api.entryFile, `import './config/index';`);
  api.injectImports(api.entryFile, `import router from './router';`);
  api.injectImports(api.entryFile, `import store from './store/index';`);
  api.injectRootOptions(api.entryFile, "store, router");

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
      `import NetworkGraphQLPlugin from "@apok/admin/vue/plugins/network/rest/NetworkGraphQLPlugin";`
    );
  }

  api.onCreateComplete(() => {
    updateNetworkConfig(adminConfigFile, options);
    fixRoutesFile(options);
  });

  //console.log(api.genJSConfig(options));
};
