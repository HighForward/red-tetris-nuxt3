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

    emitExitBoard(board: Board) {
        const player: Player = board.player
        player.socket.emit('exitBoard')
    }

    emitPieceUpdate(game: Game, board: Board, set_to_board: boolean = false) {
        if (board.current_piece) {
            game.players.forEach(player => {
                player.socket.emit("updatePiece", board.toPieceUpdate(set_to_board))
            })
        }
    }

    emitRemoveRows(game: Game, board: Board, removed_rows: number[]) {
        if (board.current_piece) {
            game.players.forEach(player => {
                player.socket.emit("removeRows", board.toRemoveRows(removed_rows))
            })
        }
    }

    emitBoardChanges(insert: boolean, removed_row: number[], board: Board, game: Game) {
        if (removed_row?.length)
            this.emitRemoveRows(game, board, removed_row)

        this.emitPieceUpdate(game, board, insert)
    }

    boardStartInterval(game: Game, board: Board) {
        const interval = setInterval(() => {
            const { insert, removed_rows, stop_board } = board.trigger()

            this.emitBoardChanges(insert, removed_rows, board, game)

            if (stop_board) {
                this.stopBoard(board, true)
                game.removeBoard(board)
                return
            }
        }, 1000)

        this.schedulerRegistry.addInterval(board.game_interval, interval)
    }

    startBoards(game: Game, pieces: Piece[]) {

        const players: Player[] = game.getPlayers()

        players.forEach(player => {
            const board: Board = new Board(player, pieces, `${game.uid}:${player.id}`)

            game.addBoard(board)
            player.currentBoard = board
            board.state = BoardState.STARTED

            this.boardStartInterval(game, board)
        })
    }

    stopBoard(board: Board, delete_interval: boolean) {
        if (board && board.game_interval) {

            if (delete_interval)
                this.schedulerRegistry.deleteInterval(board.game_interval)

            board.game_interval = null
            board.state = BoardState.FINISHED
            this.emitExitBoard(board)
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
            this.schedulerRegistry.deleteInterval(board.game_interval)

            const { insert, removed_rows, stop_board } = board.trigger()
            this.emitBoardChanges(insert, removed_rows, board, game)

            if (stop_board) {
                this.stopBoard(board, false)
                game.removeBoard(board)
                return
            }

            this.boardStartInterval(game, board)
        }
    }

    instantDown(user: Player)
    {
        const board = user.currentBoard
        const game = user.currentGame

        if (board && board.isBoardStarted()) {
            this.schedulerRegistry.deleteInterval(board.game_interval)

            let stop = true
            do {
                const { insert, removed_rows, stop_board } = board.trigger()
                stop = insert
                this.emitBoardChanges(insert, removed_rows, board, game)
                if (stop_board) {
                    this.stopBoard(board, false)
                    game.removeBoard(board)
                    return
                }
            }
            while (stop !== true)

            this.boardStartInterval(game, board)
        }
    }

}