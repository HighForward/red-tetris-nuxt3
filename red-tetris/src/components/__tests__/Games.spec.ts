import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import Games from "../../views/Games.vue";

describe('Games', () => {

    const wrapper = shallowMount(Games, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        // players: { player: { id: "test", username: "forward" },
                        // },
                    }})
            ],
        },
    })

    it('Mount Component', () => {
        expect(Games).toBeTruthy()
    })
})