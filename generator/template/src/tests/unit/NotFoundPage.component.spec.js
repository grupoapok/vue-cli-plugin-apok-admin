import NotFoundPage from "@/views/NotFoundPage";
import {shallowMount} from "@vue/test-utils";

describe("NotfoundPage.vue", () => {

    it('renders correctly', () => {
        const wrapperNotFoundPage = shallowMount(NotFoundPage);
        expect(wrapperNotFoundPage.find('p').text()).toBe("This isn't the page you're looking for");
    })

    it('')
});