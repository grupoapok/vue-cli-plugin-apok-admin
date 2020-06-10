import {initialState, mutations} from "@/store/modules/ui/mutations";
import * as actions from "@/store/modules/ui/actions";
import Vuex from 'vuex';
import {createLocalVue} from "@vue/test-utils";
import TOGGLE_SIDEBAR from '@/store/modules/ui/types';

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
    state: {...initialState},
    mutations: mutations,
    actions: actions,
});

/*MUTATIONS and STATE*/
describe('TOGGLE_SIDEBAR', () => {
    beforeEach(() => store.replaceState({...initialState}));

    it('sets sidebar state to true', () => {
        store.commit(TOGGLE_SIDEBAR, true);
        expect(store.state.sidebarExpanded).toBe(true);
    });

    it('sets sidebar state to false', () => {
        store.commit(TOGGLE_SIDEBAR, false);
        expect(store.state.sidebarExpanded).toBe(false);
    });

    it('inverts sidebar state from "true" to "false" and vice versa', () => {
        store.commit(TOGGLE_SIDEBAR, undefined);
        expect(store.state.sidebarExpanded).toBe(false);

        store.commit(TOGGLE_SIDEBAR, undefined);
        expect(store.state.sidebarExpanded).toBe(true);
    });
});


/*ACTIONS*/

describe('showSidebar', () => {
    /*mocked commit*/
    const commit = jest.fn();

    it("correctly commits the 'TOGGLE_SIDEBAR' mutation with 'true' payload", () => {
        actions.showSidebar({commit});
        expect(commit).toBeCalledWith(TOGGLE_SIDEBAR, true);
    });

    it("correctly commits the 'TOGGLE_SIDEBAR' mutation with 'false' payload", () => {
        actions.hideSidebar({commit});
        expect(commit).toBeCalledWith(TOGGLE_SIDEBAR, false);
    });

    it("correctly commits the 'TOGGLE_SIDEBAR' mutation with no payload", () => {
        actions.toggleSidebar({commit});
        expect(commit).toBeCalledWith(TOGGLE_SIDEBAR);
    });

});


