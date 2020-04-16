import {shallowMount} from "@vue/test-utils";
import About from '@/views/About';

/*About component tests*/
describe('About.vue', () => {

    it('renders correctly', () => {
        const wrapperAbout = shallowMount(About);
        expect(wrapperAbout.find('h1').text()).toBe('This is an about page')
    });
});