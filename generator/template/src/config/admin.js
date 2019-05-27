import Vue from "vue";
import NetworkPlugin from "@apok/admin/vue/plugins/network/NetworkPlugin";
import constants from "./constants";

const networkOptions = {
    %REST_CONFIG%
    %GRAPHQL_CONFIG%
};

Vue.use(NetworkPlugin, networkOptions);
