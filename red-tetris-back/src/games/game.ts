import Player, { PlayerDTO } from "../players/player";
import { v4 as uuidv4 } from 'uuid';
import { Board } from "../boards/board";

export enum RoomState {
    WARMING = 'WARMING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED'
}


export interface GameDTO {
    owner: PlayerDTO
    players: PlayerDTO[]
    state: RoomState
    name: string
    uid: string
    chat: string[]
}

const chatPrefix = (player?: Player) => {
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()

    let prefix = `[${hour}:${minutes}] `

    if (player)
        prefix += `${player.username}: `
    return prefix
}

export class Game {

    owner: Player = null
    players: Player[] = []
    state: RoomState = RoomState.WARMING
    name: string = null
    uid: string
    chat: string[] = []
    boards: Board[] = []

    // block_loop: number[] = []

    constructor(owner: Player, lobby_name: string) {
        this.owner = owner
        this.name = lobby_name
        this.players.push(owner)
        this.uid = uuidv4()
        this.boards = []
        this.newMessage(`Create the game: '${lobby_name}'.`, owner)
    }

    addPlayer(player: Player) {
        this.players.push(player)
        this.newMessage(`${player.username} join the game`)
    }

    removePlayer(player: Player) {
        const index = this.players.findIndex(p => p.id === player.id)

        if (index !== -1) {
            this.players.splice(index, 1);
            if (this.players.length > 0) {
                this.owner = this.players[0]
            }

            player.currentGame = null
            this.newMessage(`${player.username} left the game`,)
        }
    }

    newMessage(message: string, player?: Player) {
        this.chat.push(chatPrefix(player) + message)
    }


    startGame() {


    }

    toDTO() : GameDTO
    {
        return {
            players: this.players.map((player: Player) : PlayerDTO => { return player.toDTO() }),
            owner: this.owner.toDTO(),
            name: this.name,
            uid: this.uid,
            state: this.state,
            chat: this.chat
        }
    }



}