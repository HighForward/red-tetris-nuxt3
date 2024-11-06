import { mount, shallowMount } from "@vue/test-utils";
import Header from "../Header/Header.vue";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router";

describe('Header', () => {

    const wrapper = mount(Header, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        players: { player: { id: "test", username: "forward" } // your store's props  },
                        },
                    }}),
                router
            ],
        },
    })

    it('Mount Component', () => {
        expect(Header).toBeTruthy()
    })

    it('It display right username', () => {
        expect(wrapper.find('#test_username').text()).toContain('forward')
    })
})