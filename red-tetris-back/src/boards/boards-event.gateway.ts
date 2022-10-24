import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { BoardsService } from "./boards.service";
import { UseGuards } from "@nestjs/common";
import { WsGuard } from "../guards/ws.guard";
import { WsUser } from "../decorators/ws.user";
import { WsData } from "../decorators/ws-data.decorator";
import Player from "../players/player";

@UseGuards(WsGuard)
@WebSocketGateway(81,
    { cors: '*:*' }
)
export class BoardsEventGateway {

    constructor(private readonly boardsService: BoardsService) {
    }

    @WebSocketServer() server: Server

    @SubscribeMessage('rotateBlock')
    rotateBlock(@WsUser() user: Player, @WsData() game_uid: string)
    {
        // this.boardsService.rotateBlock(user)
    }

    @SubscribeMessage('translateBlock')
    translateBlock(@WsUser() user: Player, @WsData() payload: { game_uid: string, value: number })
    {
        // this.boardsService.translateBlock(user, payload.value)
    }

    @SubscribeMessage('fastDown')
    fastDown(@WsUser() user: Player, @WsData() game_uid: string)
    {
        // this.boardsService.fastDown(user, game_uid, this.server)
    }

    @SubscribeMessage('instantDown')
    instantDown(@WsUser() user: Player, @WsData() game_uid: string)
    {
        // this.boardsService.instantDown(user, game_uid, this.server)
    }

}