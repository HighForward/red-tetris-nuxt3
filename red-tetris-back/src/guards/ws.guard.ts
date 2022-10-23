import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from "socket.io";
import { PlayersService } from "../users/players.service";
import Player from "../users/player";

@Injectable()
export class WsGuard implements CanActivate {

    constructor(private readonly usersService: PlayersService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const client = context.switchToWs().getClient()
        let player: Player = null
        if (!(player = this.usersService.findOneById(client.id)))
            return false

        client.player = player
        return true;
    }
}