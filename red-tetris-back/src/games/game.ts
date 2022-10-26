import Player, { PlayerDTO } from "../players/player";
import { v4 as uuidv4 } from 'uuid';
import { Board } from "../boards/board";


export enum GameState
{
    ONGOING = 'ONGOING',
    WAITING = 'WAITING'
}


export interface GameDTO {
    owner: PlayerDTO
    players: PlayerDTO[]
    state: GameState
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
    state: GameState = GameState.WAITING
    name: string = null
    uid: string = null
    chat: string[] = []
    boards: Board[] = []

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
            player.currentBoard = null
            this.newMessage(`${player.username} left the game`,)
        }
    }

    removeBoard(player: Player) {
        const board: Board = player.currentBoard
        if (board) {
            const i: number = this.boards.findIndex((b) => b.game_interval === board.game_interval)
            this.boards.splice(i, 1)
        }
    }

    newMessage(message: string, player?: Player) {
        this.chat.push(chatPrefix(player) + message)
    }

    getBoards() {
        return this.boards
    }

    getPlayers() {
        return this.players
    }

    startGame() {
        this.state = GameState.ONGOING
    }

    addBoard(board: Board) {
        this.boards.push(board)
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