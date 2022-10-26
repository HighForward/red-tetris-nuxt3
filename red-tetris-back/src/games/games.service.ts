import { Injectable, Logger } from '@nestjs/common';
import { Game, GameState } from "./game";
import Player from "../players/player";
import { EventsServices } from "../events/events.services";
import { BoardsService } from "../boards/boards.service";
import { PiecesService } from "../pieces/pieces.service";
import { Piece } from "../pieces/piece";

@Injectable()
export class GamesService {

    constructor(
        private eventsServices: EventsServices,
        private boardsService: BoardsService,
        private piecesService: PiecesService
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

    emitPlayersMessage(game: Game, message: string, payload: any) {
        game.players.forEach(player => {
            player.socket.emit(message, payload)
        })
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
        game.addPlayer(player)
        this.eventsServices.emitMessage("updateGame", game.toDTO())
        this.emitPlayersMessage(game, "updateHub", game.toDTO())
        return game
    }

    leaveGame(player: Player) {

        let game: Game = player?.currentGame

        if (game) {
            this.boardsService.stopBoard(player)
            game.removeBoard(player)
            game.removePlayer(player)

            player.socket.emit("exitHub", true)

            if (game.players.length === 0) {
                this.removeGame(game)
            } else {
                this.eventsServices.emitMessage("updateGame", game.toDTO())
                this.emitPlayersMessage(game, "updateHub", game.toDTO())
            }
        }
        return true
    }

    sendMessage(player: Player, message: string) {

        let game: Game = player.currentGame
        if (game) {
            game.newMessage(message, player)
            this.emitPlayersMessage(game, "updateHub", game.toDTO())
        }
        return true
    }

    startGame(player: Player) {

        let game: Game = player.currentGame

        if (!game || game.state !== GameState.WAITING)
            return new Error("You can't start this game")

        if (game && game.owner?.id === player.id) {

            game.startGame()

            this.emitPlayersMessage(game, "startGame", true)

            const pieces: Piece[] = this.piecesService.generatePiecesPattern()

            this.boardsService.startBoards(game, pieces)


        }
        return true
    }



}
