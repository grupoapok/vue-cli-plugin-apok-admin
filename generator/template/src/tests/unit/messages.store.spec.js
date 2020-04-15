import {initialState, mutations} from "../mutations";
import * as actions from "../actions";
import Vuex from 'vuex';
import {createLocalVue} from "@vue/test-utils";
import {SET_FIELDS, DISMISS_MESSAGE, RESET_FIELDS, SEND_MESSAGE} from '../types';

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
    state: initialState,
    mutations: mutations,
    actions: actions,
});
let payload = {};

/*MUTATIONS and STATE*/
describe('SEND_MESSAGE', () => {

    beforeEach(() => {
        store.replaceState(initialState);
        payload = {};
    });

    it('adds a new message', () => {
        payload = {
            messageProps: {prop: 'Lorem ipsum'},
            fields: {prop: 'Dolor sit atem'} //como string solo, la mutacion lo desestructura
        };
        store.commit(SEND_MESSAGE, payload);
        expect(store.state.messages[0].messageProps.prop).toBe('Lorem ipsum');
        expect(store.state.fields.prop).toBe('Dolor sit atem');
    })
});

describe('DISMISS_MESSAGE', () => {

    beforeEach(() => {
        store.replaceState(initialState);
        payload = {};
    });

    it('dismisses the correct stored message by id', () => {
        store.state.messages.push(
            {id: 1, content: 'test message 1'},
            {id: 2, content: 'test message 2'},
            {id: 3, content: 'test message 3'},
        );
        store.commit(DISMISS_MESSAGE, 2);
        expect(store.state.messages).not.toContainEqual({id: 2, content: 'test message 2'})
    });
});

describe('SET_FIELDS', () => {

    beforeEach(() => {
        store.replaceState(initialState);
        payload = {};
    });

    it('correctly sets fields in store', () => {
        payload = {prop: 'Lorem ipsum'};
        store.commit(SET_FIELDS, payload);
        expect(store.state.fields.prop).toBe('Lorem ipsum');
    });
});

describe('RESET_FIELDS', () => {

    beforeEach(() => {
        store.replaceState(initialState);
        payload = {};
    });

    it('resets fields to an empty object', () => {
        store.commit(RESET_FIELDS);
        expect(store.state.fields).toStrictEqual({});
    });

});

/*ACTIONS*/
const commit = jest.fn();
describe('sendMessage', () => {
    /*mocked getTime() function */
    jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => 42);

    it('correctly commits "SEND_MESSAGE" mutation with the right payload', () => {
        actions.sendMessage({commit}, {prop: 'test prop'});
        expect(commit).toBeCalledWith(SEND_MESSAGE, {prop: 'test prop', id: 42});
        jest.restoreAllMocks();
    })
});

describe('dismissMessage', () => {

    it('correctly commits "DISMISS_MESSAGE" mutation with the right payload', () => {
        let payload = 42;
        actions.dismissMessage({commit}, payload);
        expect(commit).toBeCalledWith(DISMISS_MESSAGE, 42);
    })
});

describe('resetFields', () => {

    it('correctly commits "RESET_FIELDS" mutation', () => {
        actions.resetFields({commit});
        expect(commit).toBeCalledWith(RESET_FIELDS);
    })
});

describe('setFields', () => {

    it('correctly commits "SET_FIELDS" mutation', () => {
        let payload = 42;
        actions.setFields({commit}, payload);
        expect(commit).toBeCalledWith(SET_FIELDS, 42);
    })
});


