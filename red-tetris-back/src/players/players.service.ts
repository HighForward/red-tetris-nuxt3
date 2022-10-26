import { Injectable } from '@nestjs/common';
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
import Player, { UserType } from "./player";
import { GameDTO } from "../games/game";

@Injectable()
export class PlayersService {

    players: Player[] = []

    findOneById(id: string) : Player | undefined
    {
        return this.players.find((user) => { return user.id === id })
    }

    findOneIndexById(id: string) : number {
        return this.players.findIndex((user) =>  { return user.id === id })
    }

    removeOne(player: Player) : void
    {
        let user_index: number = -1
        if ((user_index = this.findOneIndexById(player.id)) !== -1)
        {
            this.players.splice(user_index, 1)
        }
    }

    createWsUser(client: Socket) : Player
    {
        const user: Player = new Player(client)
        this.players.push(user)
        return user
    }

    setUsername(id: string, username: string, type: UserType) : Player {
        let user = this.findOneById(id)
        if (user) {
            user.username = username
            user.type = type
        }
        return user
    }

    getUsers() : Player[]
    {
        return this.players
    }

}
