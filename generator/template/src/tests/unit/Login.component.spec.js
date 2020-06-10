import {createLocalVue, shallowMount} from "@vue/test-utils";
import Login from '@/views/Login';

const localVue = createLocalVue();

describe('Login component', () => {
    const doLoginMock = jest.fn();
    const wrapper = shallowMount(Login, {
        localVue,
        data(){
            return {
                user: {
                    username: 'johndoe@example.com',
                    password: 'password',
                }
            }
        },
        computed: {
            loading: () => false,
            fields: () => 'test',
        },
        methods: {
            doLogin: doLoginMock,
        },
    });

    it('triggers "doSubmit" method with the right payload when button is clicked ', async () => {
        wrapper.find('admin-form').trigger('submit');
        await wrapper.vm.$nextTick();
        expect(doLoginMock).toBeCalledWith({username: 'johndoe@example.com', password: 'password'})
    });
});
