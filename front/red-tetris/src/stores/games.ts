import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket } from "@/composables/socket";
import type { IPlayer } from "@/stores/players";
import { useRouter } from "vue-router";
import router from "@/router";
import { useBoardsStore } from "@/stores/boards";

export interface IGame {
    owner: IPlayer
    players: IPlayer[]
    state: string
    name: string
    uid: string
    chat: string[]
}

export interface IBoard {
    player: IPlayer
    state: string
    score: number
    board: Array<Array<number>>
    current_piece?: IPiece
    old_piece?: IPiece
}

export interface IPiece {
    pos: IPos[],
    color: number
}

export interface IUpdatePiece {
    player_id: string
    piece: IPiece
    set_to_board: boolean
}

export interface IRemoveRows {
    player_id: string
    removed_rows: number[]
}

export interface IPos {
    x: number
    y: number
}

export const useGamesStore = defineStore('games', {

    state: (): { games: IGame[], game: IGame | null } => ({
        games: [],
        game: null,
    }),
    getters: {},
    actions: {
        bindEvent() {
            socket.on("newGame", (new_game: IGame) => this.addGame(new_game))
            socket.on("removeGame", (removed_game: IGame) => this.removeGame(removed_game))
            socket.on("updateGame", (updated_game: IGame) => this.updateGames(updated_game))

            socket.on("exitHub", () => this.exitGame())
            socket.on("updateHub", (hub: IGame) => this.updateGame(hub))
            socket.on("startGame", async (boards: IBoard[]) => await this.startGame(boards))

        },

        getGames() {
            socket.emit("getGames",async (games: IGame[]) => {
                this.games = games
            });
        },

        createGame(name: string) {
            socket.emit("createGame", name, async (game: IGame) => {
                this.game = game
                await this.navigateToGame()
            });
        },

        joinGame(game: IGame) {
            socket.emit("joinGame", game.uid, async (game: IGame) => {
                this.game = game
                await this.navigateToGame()
            });
        },

        sendMessage(message: string) {
            socket.emit("sendMessage", message)
        },

        async startGame(boards: IBoard[]) {
            // toast.info('The Game will start')

            const boardsStore = useBoardsStore()
            boardsStore.boards = boards

            await router.push({ path: "/play" })
        },

        async triggerStartGame() {
            socket.emit('startGame')
        },

        updateGame(updateGame: IGame): void {
            this.game = updateGame
        },

        async exitGame() {
            await router.push({ path: "/games" })
        },

        kickFromGame(id: string) {
            socket.emit("kickPlayer", id)
        },

        leaveGame() {
            socket.emit("leaveGame")
        },

        async navigateToGame() {
            if (this.game) {
                await router.push({
                    path: 'hub',
                    query: { uuid: this.game.uid }
                })
            }
        },

        addGame(new_game: any) {
            this.games.push(new_game)
        },

        removeGame(removed_game: any) {
            const index: number = this.games.findIndex(game => game.uid === removed_game.uid)
            if (index !== -1) {
                this.games.splice(index, 1)
            }
        },

        updateGames(updated_game: any) {
            const index: number = this.games.findIndex(game => game.uid === updated_game.uid)
            if (index !== -1) {
                this.games[index] = updated_game
            }
        },
    },
})


