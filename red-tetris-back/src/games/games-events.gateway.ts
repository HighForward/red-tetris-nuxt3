import { Body, Catch, Logger, Req, UseFilters, UseGuards } from "@nestjs/common";
import { WsGuard } from "../guards/ws.guard";
import { WsUser } from "../decorators/ws.user";
import { WsData } from "../decorators/ws-data.decorator";
import { EventsServices } from "../events/events.services";
import { SubscribeMessage, WebSocketGateway, WsException } from "@nestjs/websockets";
import Player, { UserDTO } from "src/users/player";
import { GamesService } from "./games.service";
import { Game, GameDTO } from "./game";
import { PlayersService } from "../users/players.service";

@UseGuards(WsGuard)
@WebSocketGateway(81,
    { cors: '*:*' }
)
export class GamesEventsGateway {

    constructor(
        private gamesService: GamesService,
        private playersService: PlayersService
    ){}

    private logger: Logger = new Logger(GamesEventsGateway.name);

    @SubscribeMessage('getGames')
    getGames(@WsUser() player: Player) {
        return this.gamesService.getGames().map(game => game.toDTO())
    }

    @SubscribeMessage('createGame')
    createGame(@WsUser() player: Player, @WsData() game_name: string) : GameDTO {
        this.logger.log(`player ${player.id} created game ${game_name}`)

        if (player.currentGame) {
            this.logger.log(`player ${ player.id } already in a game ${ player.currentGame.uid }`)
            this.gamesService.leaveGame(player)
        }

        return this.gamesService.createGame(player, game_name)?.toDTO()
    }

    @SubscribeMessage('joinGame')
    joinGame(@WsUser() player: Player, @WsData() game_uuid: string) : GameDTO {

        const game: Game = this.gamesService.getGameByUUID(game_uuid)
        if (player.currentGame && player.currentGame.uid !== game.uid) {
            this.logger.log(`player ${ player.id } already in a game ${ player.currentGame.uid }`)
            this.gamesService.leaveGame(player)
        }

        if (!player?.currentGame || player.currentGame.uid !== game.uid)
            return this.gamesService.joinGame(player, game)?.toDTO()

        return game.toDTO()
    }

    @SubscribeMessage('leaveGame')
    leaveGame(@WsUser() player: Player) : boolean {
        this.logger.log(`player ${player.id} leave game ${player?.currentGame?.name}`)
        return this.gamesService.leaveGame(player)
    }

}