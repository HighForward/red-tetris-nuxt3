import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import App from "../../App.vue";

describe('App', () => {

    const wrapper = shallowMount(App, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        // players: { player: { id: "test", username: "forward" } // your store's props  },
                        // },
                    }})
            ],
        },
    })

    it('Mount Component', () => {
        expect(App).toBeTruthy()
    })
})