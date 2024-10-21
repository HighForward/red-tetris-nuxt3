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
import { WsAllExceptionsFilter } from "../filters/ws-all-exception.filter";
import Player, { UserType } from "../players/player";
import { PlayersService } from "../players/players.service";
import { GamesService } from "../games/games.service";

@WebSocketGateway(Number(process.env.WS_PORT || 81),
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
        this.logger.log(`WebSocket Init: Listen on port ${Number(process.env.WS_PORT || 81)}`);
    }

    handleConnection(client: Socket) {

        const player: Player = this.usersService.createWsUser(client)
        this.logger.log(`User Connect: ${player.id}`)
        player.socket.emit("connection", player.toDTO());
    }

    handleDisconnect(client: Socket) {

        const player: Player = this.usersService.findOneById(client.id)

        if (player) {
            this.gamesService.leaveGame(player)
            this.usersService.removeOne(player)
            this.logger.log(`User Disconnect: ${client.id}`)
        }
    }

}