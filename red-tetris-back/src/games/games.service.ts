import { Injectable, Logger } from '@nestjs/common';
import { Game } from "./game";
import Player from "../users/player";
import { EventsServices } from "../events/events.services";

@Injectable()
export class GamesService {

    constructor(
        private eventsServices: EventsServices
    ) {}

    private games: Game[] = []

    private logger: Logger = new Logger(GamesService.name);

    getGameByUUID(uuid: string) : Game {
        return this.games.find((game) => game.uid === uuid)
    }

    getGameIndexByUUID(uuid: string) : number {
        return this.games.findIndex((game) => game.uid === uuid)
    }

    removeGame(game: Game) : boolean {
        const game_index = this.getGameIndexByUUID(game?.uid)
        if (game_index === -1)
            return false

        this.eventsServices.emitMessage("removeGame", this.games[game_index].toDTO())
        this.games.splice(game_index, 1);
        return true
    }

    getGames() {
        return this.games
    }

    createGame(player: Player, game_name: string) {
        const new_game: Game = new Game(player, game_name)
        player.currentGame = new_game
        this.games.push(new_game)

        this.eventsServices.emitMessage("newGame", new_game.toDTO())
        return new_game
    }

    joinGame(player: Player, game: Game) {
        player.currentGame = game
        game.players.push(player);
        this.eventsServices.emitMessage("updateGame", game.toDTO())
        return game
    }

    leaveGame(player: Player) {

        let game: Game = player.currentGame

        if (game) {
            game.removePlayer(player)

            if (game.players.length === 0) {
                this.removeGame(game)
            } else {
                this.eventsServices.emitMessage("updateGame", game.toDTO())
            }
        }
        return true
    }







}
