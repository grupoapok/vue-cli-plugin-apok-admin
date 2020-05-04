import {mutations, initialState} from '../mutations';
import * as actions from '../actions';
import Vuex from 'vuex';
import {createLocalVue} from "@vue/test-utils";
import {LOGIN_USER, LOGOUT_USER, GET_LOGGED_USER} from '../types';
import Vue from 'vue';


/*Local vue instance*/
const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
    state: initialState,
    mutations: mutations,
    actions: actions,
});

/*Mutations tests*/
describe('LOGIN_USER', () => {

    /*fresh state before each test run*/
    let payload = {};
    beforeEach(() => {
        store.replaceState(initialState);
        payload = {
            meta: '',
        };
    });


    it("correctly changes state when meta is 'PENDING'", () => {
        payload.meta = 'PENDING';
        store.commit(LOGIN_USER, payload);
        expect(store.state.loading).toBe(true);
        expect(store.state.loggedIn).toBe(false);
    });

    it("correctly changes state when meta is 'ERROR'", () => {
        payload.meta = 'ERROR';
        store.commit(LOGIN_USER, payload);
        expect(store.state.loading).toBe(false);
        expect(store.state.loggedIn).toBe(false);
        expect(store.state.user).toStrictEqual({name: '', email: ''});
    });

    it("correctly changes state when meta is 'SUCCESS'", () => {
        payload.meta = 'SUCCESS';
        store.commit(LOGIN_USER, payload);
        expect(store.state.loading).toBe(false);
        expect(store.state.loggedIn).toBe(true);
    });
});

describe('GET_LOGGED_USER', () => {

    /*fresh state before each test run*/
    beforeEach(() => store.replaceState(initialState));
    let payload = {
        meta: '',
        data:{
            data: {
                name: 'John Doe',
                email: 'johndoe@test.com',
            }
        }
    };

    it("correctly changes state when meta is 'SUCCESS'", () => {
        payload.meta = 'SUCCESS';
        store.commit(GET_LOGGED_USER, payload);
        expect(store.state.user).toStrictEqual({name: 'John Doe', email: 'johndoe@test.com'});
        expect(store.state.loading).toBe(false);
        expect(store.state.loggedIn).toBe(true);
    });

    it("correctly changes state when meta is 'ERROR'", () => {
        payload.meta = 'ERROR';
        store.commit(GET_LOGGED_USER, payload);
        expect(store.state.loading).toBe(false);
    });

    it("correctly changes state when meta is 'PENDING'", () => {
        payload.meta = 'PENDING';
        store.commit(GET_LOGGED_USER, payload);
        expect(store.state.loading).toBe(true);
    });
});

describe('LOGOUT_USER', () => {
    it('correctly changes state when user logs out', () => {
        store.commit(LOGOUT_USER);
        expect(store.state.loading).toBe(false);
        expect(store.state.loggedIn).toBe(false);
        expect(store.state.user).toStrictEqual({name: '', email: ''});
    })
});

/*ACTIONS*/

