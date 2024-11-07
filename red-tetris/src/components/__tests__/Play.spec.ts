import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import Play from "../../views/Play.vue";

describe('Play', () => {

    const wrapper = shallowMount(Play, {
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
        expect(Play).toBeTruthy()
    })
})