import { PlayerDto } from "~/types/player.dto";
import { GameState } from "~/types/game.dto";

interface Pos {
    x: number
    y: number
}

export interface BoardDto {
    player?: PlayerDto
    state?: GameState
    score?: number
    board?: Array<Array<number>>
    current_block?: Pos[]
}