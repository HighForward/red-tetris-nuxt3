import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import Player from "../players/player";
import { Board, BoardState } from "./board";
import { Game } from "../games/game";
import { Piece } from "../pieces/piece";

@Injectable()
export class BoardsService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
    ) {}

    emitPieceUpdate(game: Game, board: Board, set_to_board: boolean = false) {
        if (board.current_piece) {
            game.players.forEach(player => {
                player.socket.emit("updatePiece", board.toPieceUpdate(set_to_board))
            })
        }
    }

    startBoards(game: Game, pieces: Piece[]) {

        const players: Player[] = game.getPlayers()

        players.forEach(player => {
            const board: Board = new Board(player, pieces, `${game.uid}:${player.id}`)
            game.addBoard(board)
            player.currentBoard = board
            board.state = BoardState.STARTED

            const interval = setInterval(() => {

                const set_to_board = board.trigger()
                this.emitPieceUpdate(game, board, set_to_board)

            }, 1000)

            this.schedulerRegistry.addInterval(board.game_interval, interval)
        })
    }

    stopBoard(player: Player) {
        const board: Board = player.currentBoard
        if (board && board.game_interval) {
            this.schedulerRegistry.deleteInterval(board.game_interval)
            board.game_interval = null
        }
    }


    rotateBlock(player: Player)
    {
        const board = player.currentBoard
        const game = player.currentGame
        if (board && board.isBoardStarted()) {
            board.current_piece.rotateTetris(board.board)
            this.emitPieceUpdate(game, board)
        }
    }

    translateBlock(user: Player, value: number)
    {
        const board = user.currentBoard
        const game = user.currentGame
        if (board && board.isBoardStarted()) {
            board.current_piece.translate(value, board.board)
            this.emitPieceUpdate(game, board)
        }
    }

    fastDown(user: Player)
    {
        const board = user.currentBoard
        const game = user.currentGame
        if (board && board.isBoardStarted()) {
            board.current_piece.fastDown(board.board)
            this.emitPieceUpdate(game, board)
        }
    }

    instantDown(user: Player)
    {
        // if (this.isBoardStarted(user))
        // {
        //     user.currentRoom.instantDown(user, this.schedulerRegistry, server)
        //     //fallback scheduler here, trigger by returned values
        // }
    }

}