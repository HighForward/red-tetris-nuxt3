import { PlayerDto } from "~/types/player.dto";

export enum RoomState {
    WARMING = 'WARMING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED'
}

export interface GameDTO {
    owner?: PlayerDto
    players?: PlayerDto[]
    state?: RoomState
    name?: string
    uid?: string
    chat?: string[]
}
