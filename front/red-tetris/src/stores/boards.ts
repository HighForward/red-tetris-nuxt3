import { defineStore } from 'pinia'
import { socket } from "@/composables/socket";
import type { IBoard, IPiece, IPos, IRemoveRows, IUpdatePiece } from "@/stores/games";
import router from "@/router";
import { useGamesStore } from "@/stores/games";

export const useBoardsStore = defineStore('board', {

    state: (): {
        boards: any | null
        board: any,
    } => ({
        boards: [],
        board: null,
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
            socket.emit('getBoard', (curr_board: any) => {
                this.board = curr_board
            })
        },

        removePiece(board: IBoard, piece?: IPiece) {
            if (piece) {
                piece.pos.forEach((pos: IPos) => {
                    if (board.board) {
                        board.board[pos.y][pos.x] = 0
                    }
                })
            }
        },

        setPiece(board: IBoard, piece?: IPiece) {
            if (piece) {
                piece.pos.forEach((pos: IPos) => {
                    if (board.board && piece) {
                        board.board[pos.y][pos.x] = piece.color
                    }
                })
            }
        },

        updatePiece(updatePieceDTO: IUpdatePiece) {

            console.log(updatePieceDTO)

            const curr_board = this.boards.find((b: IBoard) => b.player.id === updatePieceDTO.player_id)

            if (curr_board) {
                curr_board.old_piece = curr_board?.current_piece || undefined
                curr_board.current_piece = updatePieceDTO.piece

                if (!updatePieceDTO.set_to_board) {
                    this.removePiece(curr_board, curr_board.old_piece)
                }

                this.setPiece(curr_board, curr_board.current_piece)
            }
        },

        removeRow(curr_board: IBoard, row_index: number) {
            return new Promise((resolve, reject) => {
                let count = 0
                let i = setInterval(() => {

                    curr_board.board[row_index][count] = 0
                    count++;
                    if (count === 10) {
                        clearInterval(i);
                        resolve(true)
                    }
                }, 20);
            })
        },

        removeRows(remove_rows: IRemoveRows) {
            const curr_board = this.boards.find((b: IBoard) => b.player.id === remove_rows.player_id)

            if (curr_board && remove_rows.removed_rows.length) {

                remove_rows.removed_rows.forEach((row_index) => {


                    this.removeRow(curr_board, row_index).then(() => {

                        this.removePiece(curr_board, curr_board.current_piece)

                        for (let y = row_index; y > 0; y--) {
                            curr_board.board[y] = curr_board.board[y - 1].map((item: any) => item)
                        }
                        curr_board.board[0].fill(0)

                        this.setPiece(curr_board, curr_board.current_piece)

                    })


                })
            }
        },

        exitBoard() {
            const gamesStore = useGamesStore()

            if (gamesStore.game?.uid) {
                router.push({ path: "/hub", query: { uuid: gamesStore.game.uid } })
            }
        },

    },

})
