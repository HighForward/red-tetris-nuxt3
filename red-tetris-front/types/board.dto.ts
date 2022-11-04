import { PlayerDto } from "~/types/player.dto";
import { GameState } from "~/types/game.dto";

export interface PieceDTO {
    pos: Pos[],
    color: number
}

export interface UpdatePieceDTO {
    player_id: string
    piece: PieceDTO
    set_to_board: boolean
}

export interface RemoveRowsDTO {
    player_id: string
    removed_rows: number[]
}

export interface Pos {
    x: number
    y: number
}

export interface BoardDTO {
    player: PlayerDto
    state: GameState
    score: number
    board: Array<Array<number>>
    current_piece?: PieceDTO
    old_piece?: PieceDTO
}