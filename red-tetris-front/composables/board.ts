import { BoardDto } from "~/types/board.dto";
import { GameState } from "~/types/game.dto";

export const useBoard = () => useState<BoardDto>('board', () => ({
    player: {},
    state: GameState.WARMING,
    score: 0,
    board: new Array(20).fill(0).map(() => new Array(10).fill(0)),
    current_block: []
}) )
