import Player, { UserDTO } from "../users/player";
import { v4 as uuidv4 } from 'uuid';

export enum RoomState {
    WARMING = 'WARMING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED'
}


export interface GameDTO {
    owner: UserDTO
    players: UserDTO[]
    state: RoomState
    name: string
    uid: string
    chat: string[]
}

export class Game {

    owner: Player = null
    players: Player[] = []
    state: RoomState = RoomState.WARMING
    name: string = null
    uid: string
    chat: string[] = []

    // block_loop: number[] = []
    // boards: Board[] = []

    constructor(owner: Player, lobby_name: string) {
        this.owner = owner
        this.name = lobby_name
        this.players.push(owner)
        this.uid = uuidv4()
        // this.emitMsgToChat(`Création de la partie: '${lobby_name}'.`, owner)
    }

    removePlayer(player: Player) {
        const index = this.players.findIndex(p => p.id === player.id)

        if (index !== -1) {
            this.players.splice(index, 1);
            if (this.players.length > 0) {
                this.owner = this.players[0]
            }

            player.currentGame = null
        }
    }

    toDTO() : GameDTO
    {
        return {
            players: this.players.map((player: Player) : UserDTO => { return player.toDTO() }),
            owner: this.owner.toDTO(),
            name: this.name,
            uid: this.uid,
            state: this.state,
            chat: this.chat
        }
    }



}