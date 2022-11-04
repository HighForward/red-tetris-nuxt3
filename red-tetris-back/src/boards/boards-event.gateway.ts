import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { BoardsService } from "./boards.service";
import { UseGuards } from "@nestjs/common";
import { WsGuard } from "../guards/ws.guard";
import { WsUser } from "../decorators/ws.user";
import { WsData } from "../decorators/ws-data.decorator";
import Player from "../players/player";
import { BoardDTO } from "./board";

@UseGuards(WsGuard)
@WebSocketGateway(81,
    { cors: '*:*' }
)
export class BoardsEventGateway {

    constructor(private readonly boardsService: BoardsService) {
    }

    @SubscribeMessage('getBoard')
    getBoard(@WsUser() user: Player) : BoardDTO
    {
        return user?.currentBoard?.toDTO()
    }

    @SubscribeMessage('getBoards')
    getBoards(@WsUser() user: Player) : BoardDTO[]
    {
        const game = user.currentGame
        if (game) {
            return game.boards.map((game) => game.toDTO())
        }
    }

    @SubscribeMessage('rotateBlock')
    rotateBlock(@WsUser() user: Player)
    {
        this.boardsService.rotateBlock(user)
    }

    @SubscribeMessage('translateBlock')
    translateBlock(@WsUser() user: Player, @WsData() value: number )
    {
        this.boardsService.translateBlock(user, value)
    }

    @SubscribeMessage('fastDown')
    fastDown(@WsUser() user: Player)
    {
        this.boardsService.fastDown(user)
    }

    @SubscribeMessage('instantDown')
    instantDown(@WsUser() user: Player)
    {
        this.boardsService.instantDown(user)
    }

}