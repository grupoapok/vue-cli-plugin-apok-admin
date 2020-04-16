import Vue from "vue";
import * as networkFunctions from './networkFunctions'

export const executeRequest = (url, params, method) => {
    const reqMethod = method.toLowerCase();
    let promise;
    switch (reqMethod) {
        case "get":
            promise = Vue.http.get(url, params);
            break;
        case "post":
            promise = Vue.http.post(url, params);
            break;
        case "put":
            promise = Vue.http.put(url, params);
            break;
        case "delete":
            promise = Vue.http.delete(url, params);
            break;
    }
    return promise.then(response => response.body);
};

export const executeVuexRequest = (context, action, url, params, method = "get") => {
    context.commit(action, { meta: "PENDING", data: params });
    const reqPromise = networkFunctions.executeRequest(url, params, method);
    return new Promise((resolve, reject) => {
        reqPromise
            .then(response => {
                context.commit(action, { meta: "SUCCESS", data: response });
                resolve(response);
            })
            .catch(error => {
                context.commit(action, { meta: "ERROR" });
                reject(error);
            });
    });
};
