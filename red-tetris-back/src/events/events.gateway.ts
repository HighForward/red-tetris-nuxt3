import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { EventsServices } from './events.services';
import { WsUser } from "../decorators/ws.user";
import { WsGuard } from 'src/guards/ws.guard';
import { WsAllExceptionsFilter } from "../filters/ws-all-exception.filter";
import Player from "../players/player";
import { PlayersService } from "../players/players.service";
import { GamesService } from "../games/games.service";

@WebSocketGateway(81,
{ cors: '*:*' }
)
@UseFilters(WsAllExceptionsFilter)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    constructor(
        private readonly usersService: PlayersService,
        private readonly gamesService: GamesService,
        private readonly eventsService: EventsServices
    ) {}

    private logger: Logger = new Logger(AppGateway.name);

    afterInit(server: Server) {
        this.eventsService.server = server
        this.logger.log(`WebSocket Init: Listen on port 81`);
    }

    handleConnection(client: Socket) {

        const user: Player = this.usersService.createWsUser(client)
        this.logger.log(`User Connect: ${user.id}`)
        user.socket.emit("connection", user.toDTO());
    }

    handleDisconnect(client: Socket) {

        const user: Player = this.usersService.findOneById(client.id)

        if (user) {
            this.gamesService.leaveGame(user)
        }

        this.logger.log(`User Disconnect: ${client.id}`)
    }

}