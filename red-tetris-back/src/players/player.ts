import { Socket } from "socket.io";
import { Game, GameDTO } from "../games/game";

export interface PlayerDTO
{
    id: string;
    username: string;
    type: UserType
}

export enum UserType
{
    GUEST = 'GUEST',
    USERNAME = 'USERNAME',
}

export default class Player {

    id: string;
    username: string;
    type: UserType
    socket: Socket
    currentGame: Game

    constructor(client: Socket) {
        this.id = client.id
        this.username = `guest#${client.id.substring(0, 4)}`
        this.socket = client
        this.type = UserType.GUEST
        this.currentGame = null
        // this.currentBoard = null
    }

    toDTO() : PlayerDTO
    {
        return {
            id: this.id,
            username: this.username,
            type: this.type,
        }
    }

}