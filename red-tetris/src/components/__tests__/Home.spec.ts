import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, it, test } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import Home from "../../views/Home.vue";
import router from "@/router";

describe('Home', () => {

    const wrapper = mount(Home, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        // players: { player: { id: "test", username: "forward" } // your store's props  },
                        // },
                    }}),
                router
            ],
        },
    })

    it('Mount Component', () => {
        expect(Home).toBeTruthy()
    })

    it('has button', () => {
        expect(wrapper.find("button").exists()).toBe(true);
    })

    test("Button clicked and update username", async () => {
        wrapper.vm.tmpUsername = 'XD'
        await wrapper.find('input').setValue('username_de_fou')
        expect(wrapper.vm.tmpUsername).toBe('username_de_fou')
        const ac = await wrapper.get("button").trigger("click")
        wrapper.vm.goToPlay()
    })
})