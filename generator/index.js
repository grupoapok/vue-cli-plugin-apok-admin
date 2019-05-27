const { EOL } = require('os');
const fs = require('fs');

function updateNetworkConfig(options) {
    const adminConfigFile = `./src/config/admin.js`;
    let adminConfigContent = fs.readFileSync(adminConfigFile, { encoding: 'utf-8' });
    let restConfig = '';
    let graphConfig = '';
    if (options.restClient){
        restConfig = `rest: {${EOL}\t\tbaseUrl: '${options.restBaseUrl}',${EOL}\t\tsessionCookie: constants.SESSION_COOKIE,${EOL}\t},${EOL}`
    }
    if (options.graphQLClient){
        graphConfig = `graphql: {${EOL}\t\tbaseUrl: '${options.graphBaseUrl}',${EOL}\t\tsessionCookie: constants.SESSION_COOKIE,${EOL}\t},${EOL}`
    }
    adminConfigContent = adminConfigContent.replace('%REST_CONFIG%',restConfig);
    adminConfigContent = adminConfigContent.replace('%GRAPHQL_CONFIG%',graphConfig);
    fs.writeFileSync(adminConfigFile, adminConfigContent, { encoding: 'utf-8' });
}

function fixRoutesFile(options) {
    const routesFile = `./src/router.js`;
    let routesContent = fs.readFileSync(routesFile, { encoding: 'utf-8' });
    routesContent = routesContent.replace("%FRAMEWORK%", options.cssFramework.toLowerCase());
    fs.writeFileSync(routesFile, routesContent, { encoding: 'utf-8' });
}

function updateEntryFile(api) {
    const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g);

    const renderIndex = lines.findIndex(line => line.match(/render/));
    lines[renderIndex - 1] += `${EOL}   router,${EOL}   store,`;

    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' });
}

function updatePackage(api, options){
    let dependencies = {
        "@apok/admin": "^0.1.1-rc.3",
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
        "sass-loader": "^7.1.0",
        "vue-router": "^3.0.3",
        "vuex": "^3.0.1",
        "vuex-i18n": "^1.11.0",
        "register-service-worker": "^1.6.2",
    };

    if (options.restClient) {
        dependencies = {
            ...dependencies,
            "vue-resource": "^1.5.1",
        }
    }

    if (options.graphQLClient) {
        dependencies = {
            ...dependencies,
            "apollo-boost": "^0.3.1",
            "apollo-cache-inmemory": "^1.5.1",
            "apollo-client": "^2.5.1",
            "apollo-link-error": "^1.1.10",
            "apollo-link-http": "^1.5.14",
            "graphql": "^14.3.0",
            "graphql-tag": "^2.10.1",
        }
    }

    dependencies = {
        ...dependencies,
        [`@apok/admin-components-${options.cssFramework.toLowerCase()}`]: '^1.0.1-rc.5'
    };

    api.extendPackage({
        dependencies,
        devDependencies: {
            "postcss-import": "^12.0.1",
            "node-sass": "^4.9.0",
            "sass-loader": "^7.1.0",
        },
        scripts: {
            "create": "apok-admin-create"
        }
    });
}

module.exports = (api, options) => {
    updatePackage(api, options);

    api.render('./template');

    api.injectImports(api.entryFile, `import './config/index';`);
    api.injectImports(api.entryFile, `import router from './router';`);
    api.injectImports(api.entryFile, `import store from './store/index';`);

    api.onCreateComplete(() => {
        updateNetworkConfig(options);
        fixRoutesFile(options);
        updateEntryFile(api);

        api.genJSConfig(options);
    })
};
