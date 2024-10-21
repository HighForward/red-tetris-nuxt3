import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Logger, UseGuards } from "@nestjs/common";
import { WsGuard } from "../guards/ws.guard";
import { WsUser } from "../decorators/ws.user";
import { WsData } from "../decorators/ws-data.decorator";
import { EventsServices } from "../events/events.services";
import { PlayersService } from "./players.service";
import Player, { PlayerDTO, UserType } from "./player";

@UseGuards(WsGuard)
@WebSocketGateway(Number(process.env.WS_PORT || 81),
    { cors: '*:*' }
)
export class UsersEventsGateway {

    constructor(
        private readonly playersService: PlayersService,
        private readonly eventsService: EventsServices
    ) {}
    private logger: Logger = new Logger(UsersEventsGateway.name);

    @SubscribeMessage('selectUsername')
    selectUsername(@WsUser() player: Player, @WsData() username: string) {
        this.playersService.setUsername(player.id, username, UserType.USERNAME)
        this.logger.log(`updateUsername() user: ${player.id} updated his username`)
        return player.toDTO()
    }


    @SubscribeMessage('getUsersOnline')
    getUsersOnline(@WsUser() player: Player) : PlayerDTO[]
    {
        this.logger.log(`getUsersOnline()`)
        const players = this.playersService.getUsers()
        return players.map((player) => {
            return player.toDTO()
        })
    }

}