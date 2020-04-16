import {createLocalVue, shallowMount} from "@vue/test-utils";
import Login from '@/views/Login';
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);


/*Login component tests*/
describe('Login.vue', () => {

    it('renders correctly ', () => {
        const shallowWrapperLogin = shallowMount(Login);
        console.log(shallowWrapperLogin.html());

    });
});