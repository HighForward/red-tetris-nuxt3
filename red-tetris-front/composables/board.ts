import { GameDTO, GameState } from "~/types/game.dto";
import { usePlayer } from "~/composables/player";
import { BoardDTO, Pos, UpdatePieceDTO } from "~/types/board.dto";

export const useBoard = () => useState<BoardDTO>('board', () => ({
    player: {},
    state: GameState.WARMING,
    score: 0,
    board: new Array(20).fill(0).map(() => new Array(10).fill(0)),
    current_piece: undefined,
    old_piece: undefined
}))

export function useBoardListeners() {

    const { $client } = useNuxtApp()
    const board = useBoard()
    const player = usePlayer()

    function updatePiece(updatePieceDTO: UpdatePieceDTO) {

        console.log(updatePieceDTO)
        if (updatePieceDTO?.player_id === player.value?.id) {

            board.value.old_piece = board.value?.current_piece || undefined
            board.value.current_piece = updatePieceDTO.piece

            if (!updatePieceDTO.set_to_board) {
                board.value.old_piece?.pos.forEach((pos: Pos) => {
                    if (board.value.board && board.value.old_piece) {
                        board.value.board[pos.y][pos.x] = 0
                    }
                })
            }

            board.value.current_piece.pos.forEach((pos: Pos) => {
                if (board.value.board && board.value.current_piece) {
                    board.value.board[pos.y][pos.x] = board.value?.current_piece.color
                }
            })
        }
    }

    function listenBoardsListEvents() {
        $client.on("updatePiece", (updatePieceDTO: UpdatePieceDTO) => updatePiece(updatePieceDTO))
    }

    function removeBoardsListEvents() {
        $client.off("updatePiece")
    }

    onMounted(() => {
        $client.emit('getBoard', (curr_board: BoardDTO) => board.value = curr_board)
        listenBoardsListEvents()
    })

    onUnmounted(() => {
        removeBoardsListEvents()
    })

}

