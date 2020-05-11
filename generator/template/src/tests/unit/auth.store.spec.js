import {mutations, initialState} from '@/store/modules/auth/mutations';
import * as actions from '@/store/modules/auth/actions';
import Vuex from 'vuex';
import {createLocalVue} from "@vue/test-utils";
import {LOGIN_USER, LOGOUT_USER, GET_LOGGED_USER} from '@/store/modules/auth/types';
import * as networkFunctions from './networkFunctions'
import Cookies from 'js-cookie'

/*Local vue instance*/
const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
    state: {...initialState},
    mutations: mutations,
    actions: actions,
});

/*Mutations tests*/
describe('LOGIN_USER', () => {

    /*fresh state before each test run*/
    let payload = {};
    beforeEach(() => {
        store.replaceState({...initialState});
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

describe('doLogin', () =>{
    /*mocked functions*/
    const context = {
        dispatch: jest.fn(),
        commit: jest.fn()
    };
    const executeVuexRequestMock = jest.spyOn(networkFunctions, 'executeVuexRequest');
    jest.spyOn(Cookies, 'set');

    it('correctly dispatches "getUser" and executes "Cookies.set" when "executeVuexRequest" resolves', async () => {
        /*mocked resolve*/
        executeVuexRequestMock.mockResolvedValueOnce({access_token: 'test_token'});

        await actions.doLogin(context, {});
        expect(context.dispatch).toBeCalledWith('getUser');
        expect(Cookies.set).toBeCalledWith('apok.admin.session', 'test_token');
    });

    it('correctly dispatches "messages/setFields" when "executeVuexRequest" rejects', async () => {
        /*mocked reject*/
        executeVuexRequestMock.mockRejectedValueOnce({status: 401, body: { message: 'test' }});

        await actions.doLogin(context, {});
        expect(context.dispatch).toBeCalledWith('messages/setFields', {username: 'test'}, {root: true});
    })
});

describe('getUser', () => {
    /*mocked functions*/
    const context = {
        commit: jest.fn(),
    };
    const executeVuexRequestMock = jest.spyOn(networkFunctions, 'executeVuexRequest');
    const executeRequestMock = jest.spyOn(networkFunctions, 'executeRequest');

    it('correctly calls "executeVuexRequest" mutation', () => {
        executeRequestMock.mockResolvedValueOnce({});
        actions.getUser(context);
        expect(executeVuexRequestMock).toBeCalledWith(context, GET_LOGGED_USER, 'profile')

    })
});

describe('logout', () => {
    /*mocked functions*/
    const commit = jest.fn();
    jest.spyOn(Cookies, 'remove');

    it('successfully commits "LOGOUT_USER" and removes cookies', () => {

        actions.logout({commit});
        expect(Cookies.remove).toBeCalledWith('apok.admin.session');
        expect(commit).toBeCalledWith(LOGOUT_USER);
    })
});
