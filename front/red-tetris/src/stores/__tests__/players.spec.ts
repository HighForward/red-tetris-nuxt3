import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { usePlayerStore } from "../players";
import { RouterLinkStub, config } from '@vue/test-utils'
import Home from "../../views/Home.vue";

const RouterLinkStb = { ...RouterLinkStub, useLink: vi.fn() }
config.global.mocks = {
    // No more errors here, and tests are OK
    RouterLink: RouterLinkStb
}

describe('PlayersStore', () => {

    const wrapper = mount(Home, {
        global: {
            plugins: [createTestingPinia()],
        },
    })

    const store = usePlayerStore()

    it('Create PlayersStore', () => {
        // console.log(store.player)
    })
})