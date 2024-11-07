import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { usePlayerStore } from "../players";
import { RouterLinkStub, config } from '@vue/test-utils'
import Play from "../../views/Play.vue";
import { useBoardsStore } from "../boards";
import type { IPos } from "../games";

const RouterLinkStb = {
    ...RouterLinkStub,
    useLink: vi.fn(),
}
config.global.mocks = {
    // No more errors here, and tests are OK
    RouterLink: RouterLinkStb,
}

describe('PlayersStore', () => {

    const wrapper = mount(Play, {
        global: {
            plugins: [createTestingPinia({ stubActions: false })],
        },
    })

    const boardsStore = useBoardsStore()
    const playerStore = usePlayerStore()

    playerStore.player = {
        id: "1",
        "username": "Forward",
    }

    boardsStore.boards = [{
        player: {
            id: "1",
            "username": "Forward",
        },
        board: new Array(20).fill(0).map(() => new Array(10).fill(0)),
    }]


    it('Create BoardsStore', () => {
        boardsStore.setPiece(0, {
            pos: [{
                "y": 0,
                "x": 5,
            }, {
                "y": 1,
                "x": 4,
            }, {
                "y": 1,
                "x": 5,
            }, {
                "y": 1,
                "x": 6,
            }],
            color: 1,
        })
    })

    it('Remove Row', async () => {
        boardsStore.boards[0].board[19].fill(1)

        expect(boardsStore.boards[0].board[19]).toStrictEqual(new Array(10).fill(1))

        await boardsStore.removeRows({
            player_id: "1",
            removed_rows: [19],
            score: 0,
        })

        expect(boardsStore.boards[0].board[19]).toStrictEqual(new Array(10).fill(0))
        expect(boardsStore.removeRows).toHaveBeenCalledTimes(1)
    })

    it('Update Piece', async () => {

        await boardsStore.updatePiece({
            player_id: "1",
            piece: {
                pos: [{
                    "y": 0,
                    "x": 4,
                }, {
                    "y": 0,
                    "x": 5,
                }, {
                    "y": 1,
                    "x": 5,
                }, {
                    "y": 1,
                    "x": 6,
                }], color: 1,
            },
            set_to_board: true,
        })

        expect(boardsStore.updatePiece).toHaveBeenCalledTimes(1)
    })

    it('Exit Game', async () => {

        await boardsStore.exitBoard()//
        expect(boardsStore.exitBoard).toHaveBeenCalledTimes(1)
    })

})