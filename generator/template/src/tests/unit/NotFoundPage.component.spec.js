import NotFoundPage from "@/views/NotFoundPage";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

/*NotFoundPage tests*/
describe("NotfoundPage.vue", () => {

    it('renders correctly', () => {
        const wrapperNotFoundPage = shallowMount(NotFoundPage);
        expect(wrapperNotFoundPage.find('h1').text()).toBe("404");
        expect(wrapperNotFoundPage.find('p').text()).toBe("This isn't the page you're looking for");
    });

    it('correctly triggers "goBack" method when "icon-button" is clicked', async () => {
        const wrapperNotFoundPage = shallowMount(NotFoundPage, {
            mocks: {
                $router: {
                    go: jest.fn()
                }
            }
        });
        wrapperNotFoundPage.find('icon-button').trigger('click');
        await wrapperNotFoundPage.vm.$nextTick();
        expect(wrapperNotFoundPage.vm.$router.go).toBeCalledWith(-1)
    });
});
