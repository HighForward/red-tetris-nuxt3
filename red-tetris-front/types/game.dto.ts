import { PlayerDto } from "~/types/player.dto";

export enum GameState {
    WARMING = 'WARMING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED'
}

export interface GameDTO {
    owner: PlayerDto
    players: PlayerDto[]
    state: GameState
    name: string
    uid: string
    chat: string[]
}
