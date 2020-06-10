import {shallowMount} from "@vue/test-utils";
import Dashboard from "@/views/Dashboard";

/*About component tests*/
describe('Dashboard.vue', () => {

    it('renders correctly', () => {
        const wrapperDashboard = shallowMount(Dashboard);
        expect(wrapperDashboard.text()).toBe('Dashboard')
    });
});