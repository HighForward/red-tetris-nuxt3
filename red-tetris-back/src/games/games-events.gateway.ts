import { Body, Catch, Logger, Req, UseFilters, UseGuards } from "@nestjs/common";
import { WsGuard } from "../guards/ws.guard";
import { WsUser } from "../decorators/ws.user";
import { WsData } from "../decorators/ws-data.decorator";
import { EventsServices } from "../events/events.services";
import { SubscribeMessage, WebSocketGateway, WsException } from "@nestjs/websockets";
import Player, { PlayerDTO } from "src/players/player";
import { GamesService } from "./games.service";
import { Game, GameDTO } from "./game";
import { PlayersService } from "../players/players.service";

@UseGuards(WsGuard)
@WebSocketGateway(Number(process.env.WS_PORT || 81),
    { cors: '*:*' }
)
export class GamesEventsGateway {

    constructor(
        private gamesService: GamesService,
        private playersService: PlayersService
    ){}

    private logger: Logger = new Logger(GamesEventsGateway.name);

    @SubscribeMessage('getGame')
    getGame(@WsUser() player: Player) {
        return player.currentGame.toDTO()
    }

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

    @SubscribeMessage('kickPlayer')
    kickPlayer(@WsUser() player: Player, @WsData() player_id: string) : boolean {
        this.logger.log(`player ${player.id} kick ${player_id} from game ${player?.currentGame?.name}`)
        const target_player: Player = this.playersService.findOneById(player_id)
        return this.gamesService.leaveGame(target_player)
    }

    @SubscribeMessage('sendMessage')
    sendMessage(@WsUser() player: Player, @WsData() message: string) : boolean {
        this.logger.log(`player ${player.id} send message to game ${player?.currentGame?.name}`)
        return this.gamesService.sendMessage(player, message)
    }

    @SubscribeMessage('startGame')
    startGame(@WsUser() player: Player) {
        this.logger.log(`player ${player.id} start game ${player?.currentGame?.name}`)
        return this.gamesService.startGame(player)
    }


}