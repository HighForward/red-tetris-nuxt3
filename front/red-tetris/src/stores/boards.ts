import { defineStore } from 'pinia'
import { socket } from "@/composables/socket";
import type { IBoard, IPiece, IPos, IRemoveRows, IUpdatePiece } from "@/stores/games";
import router from "@/router";
import { useGamesStore } from "@/stores/games";

export const useBoardsStore = defineStore('board', {

    state: (): {
        boards: any | null
    } => ({
        boards: [],
    }),
    getters: {},
    actions: {
        bindEvent() {
            socket.on('connect', () => {
                socket.on("updatePiece", (updatePieceDTO: IUpdatePiece) => this.updatePiece(updatePieceDTO))
                socket.on("removeRows", (updatePieceDTO: IRemoveRows) => this.removeRows(updatePieceDTO))
                socket.on("exitBoard", () => this.exitBoard())
            })
        },


        getBoard() {
            // socket.emit('getBoard', (curr_board: any) => {
            //     this.board = curr_board
            // })
        },

        removePiece(i: number, piece?: IPiece) {
            if (piece) {
                piece.pos.forEach((pos: IPos) => {
                    if (this.boards[i].board) {
                        this.boards[i].board[pos.y][pos.x] = 0
                    }
                })
            }
        },

        setPiece(i: number, piece?: IPiece) {
            if (piece) {
                piece.pos.forEach((pos: IPos) => {
                    if (this.boards[i].board && piece) {
                        this.boards[i].board[pos.y][pos.x] = piece.color
                    }
                })
            }
        },

        updatePiece(updatePieceDTO: IUpdatePiece) {

            const i = this.boards.findIndex((b: IBoard) => b.player.id === updatePieceDTO.player_id)

            if (i > -1) {
                this.boards[i].old_piece = this.boards[i]?.current_piece || undefined
                this.boards[i].current_piece = updatePieceDTO.piece

                if (!updatePieceDTO.set_to_board) {
                    this.removePiece(i, this.boards[i].old_piece)
                }

                this.setPiece(i, this.boards[i].current_piece)
            }
        },

        removeRow(i: number, row_index: number) {
            return new Promise((resolve, reject) => {
                let count = 0
                let interval = setInterval(() => {

                    this.boards[i].board[row_index][count] = 0
                    count++;
                    if (count === 10) {
                        clearInterval(interval);
                        resolve(true)
                    }
                }, 20);
            })
        },

        removeRows(remove_rows: IRemoveRows) {
            const i = this.boards.findIndex((b: IBoard) => b.player.id === remove_rows.player_id)

            if (i > -1 && remove_rows.removed_rows.length) {

                remove_rows.removed_rows.forEach((row_index) => {


                    this.removeRow(i, row_index).then(() => {

                        this.removePiece(i, this.boards[i].current_piece)

                        for (let y = row_index; y > 0; y--) {
                            this.boards[i].board[y] = this.boards[i].board[y - 1].map((item: any) => item)
                        }
                        this.boards[i].board[0].fill(0)

                        this.setPiece(i, this.boards[i].current_piece)

                    })


                })
            }
        },

        async exitBoard() {
            const gamesStore = useGamesStore()

            if (gamesStore.game?.uid) {
                await router.push({
                    path: "/hub",
                    query: { uuid: gamesStore.game.uid }
                })
            }
        },

    },

})
