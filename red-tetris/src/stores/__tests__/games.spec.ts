import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { IPlayer, usePlayerStore } from "../players";
import { RouterLinkStub, config } from '@vue/test-utils'
import Games from "../../views/Games.vue";
import { useGamesStore } from "../games";

const RouterLinkStb = {
    ...RouterLinkStub,
    useLink: vi.fn(),
}
config.global.mocks = {
    // No more errors here, and tests are OK
    RouterLink: RouterLinkStb,
}

describe('PlayersStore', () => {

    const wrapper = mount(Games, {
        global: {
            plugins: [createTestingPinia({ stubActions: false })],
        },
    })

    const playerStore = usePlayerStore()
    const gamesStore = useGamesStore()


    playerStore.player = {
        id: "1",
        "username": "Forward",
    }

    gamesStore.games = [{
        owner: {
            id: "1",
            "username": "Forward",
        },
        players: [{
            id: "1",
            "username": "Forward",
        }],
        state: 'WAITING',
        name: "Game Test",
        uid: '1',
        chat: []
    }]

    it('Create Game', () => {

    })



})