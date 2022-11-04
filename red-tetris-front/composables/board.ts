import { GameDTO, GameState } from "~/types/game.dto";
import { usePlayer } from "~/composables/player";
import { BoardDTO, PieceDTO, Pos, RemoveRowsDTO, UpdatePieceDTO } from "~/types/board.dto";

export const useBoard = () => useState<BoardDTO>('board', () => ({
    player: {},
    state: GameState.WARMING,
    score: 0,
    board: new Array(20).fill(0).map(() => new Array(10).fill(0)),
    current_piece: undefined,
    old_piece: undefined
}))

export const useGameBoards = () => useState<BoardDTO[]>('game_boards', () => ([]))

export function useBoardListeners() {

    const { $client } = useNuxtApp()
    const board = useBoard()
    const player = usePlayer()
    const game_boards = useGameBoards()
    const hub = useHub()

    function removePiece(board: BoardDTO, piece?: PieceDTO) {
        if (piece) {
            piece.pos.forEach((pos: Pos) => {
                if (board.board) {
                    board.board[pos.y][pos.x] = 0
                }
            })
        }
    }

    function setPiece(board: BoardDTO, piece?: PieceDTO) {
        if (piece) {
            piece.pos.forEach((pos: Pos) => {
                if (board.board && piece) {
                    board.board[pos.y][pos.x] = piece.color
                }
            })
        }
    }

    function updatePiece(updatePieceDTO: UpdatePieceDTO) {

        const curr_board = game_boards.value.find(b => b.player.id === updatePieceDTO.player_id)

        if (curr_board) {
            curr_board.old_piece = curr_board?.current_piece || undefined
            curr_board.current_piece = updatePieceDTO.piece

            if (!updatePieceDTO.set_to_board) {
                removePiece(curr_board, curr_board.old_piece)
            }

            setPiece(curr_board, curr_board.current_piece)
        }
    }

    function removeRow(curr_board: BoardDTO, row_index: number) {
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
    }

    function removeRows(remove_rows: RemoveRowsDTO) {
        const curr_board = game_boards.value.find(b => b.player.id === remove_rows.player_id)

        if (curr_board && remove_rows.removed_rows.length) {

            remove_rows.removed_rows.forEach((row_index) => {


                removeRow(curr_board, row_index).then(() => {

                    removePiece(curr_board, curr_board.current_piece)

                    for (let y = row_index; y > 0; y--) {
                        curr_board.board[y] = curr_board.board[y - 1].map((item) => item)
                    }
                    curr_board.board[0].fill(0)

                    setPiece(curr_board, curr_board.current_piece)

                })


            })
        }
    }

    function exitBoard() {
        navigateTo({
            path: '/hub',
            query: {
                uuid: hub.value.uid
            }
        })
    }

    function listenBoardsListEvents() {
        $client.on("updatePiece", (updatePieceDTO: UpdatePieceDTO) => updatePiece(updatePieceDTO))
        $client.on("removeRows", (updatePieceDTO: RemoveRowsDTO) => removeRows(updatePieceDTO))
        $client.on("exitBoard", () => exitBoard())
    }

    function removeBoardsListEvents() {
        $client.off("updatePiece")
        $client.off("removeRows")
        $client.off("exitBoard")
    }

    onMounted(() => {
        $client.emit('getBoard', (curr_board: BoardDTO) => board.value = curr_board)
        listenBoardsListEvents()
    })

    onUnmounted(() => {
        removeBoardsListEvents()
    })

}

