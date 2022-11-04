import Player, { PlayerDTO } from "../players/player";
import { Piece, Pos, RemoveRowsDTO, UpdatePieceDTO } from "../pieces/piece";

export enum BoardState {
    WARMING = 'WARMING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED'
}


export interface BoardDTO {
    player: PlayerDTO
    state: BoardState
    score: number
    board: Array<Array<number>>
}

export class Board
{
    player: Player
    state: BoardState
    board: Array<Array<number>> = []
    current_piece: Piece
    pieces_pattern: Piece[]
    piece_index: number = 0
    score: number = 0

    game_interval: string = null

    constructor(owner: Player, pieces: Piece[], game_interval: string) {
        this.player = owner
        this.state = BoardState.WARMING
        this.pieces_pattern = pieces.map((p) => p.clone())
        this.board = new Array(20).fill(0).map(() => new Array(10).fill(0))
        this.game_interval = game_interval
    }


    setTetrisToBoard(board: Array<Array<number>>)
    {
        const spawn_margin = 4

        this.current_piece = this.pieces_pattern[this.piece_index]
        this.current_piece.x = spawn_margin
        this.current_piece.y = 0
        this.piece_index++;

        if (this.piece_index >= this.pieces_pattern.length) {
            this.piece_index = 0;
        }

        if (!this.current_piece.canBlockBeInserted(board)) {
            return true
        }
        return false
    }

    //return true when need to be draw
    trigger()
    {
        let stop_board: boolean = false
        if (!this.current_piece) {
            stop_board = this.setTetrisToBoard(this.board)
        }
        else if (!this.current_piece.getBoundsVertical(this.board)) {

            this.drawCurrentPieceToBoard()
            this.current_piece = null
            const removed_rows: number[] = this.removeRow()
            stop_board = this.setTetrisToBoard(this.board)
            return {
                insert: true,
                removed_rows: removed_rows,
                stop_board: stop_board
            }
        }
        else {
            this.current_piece.y++
        }

        return {
            insert: false,
            removed_row: [],
            stop_board: stop_board
        }
    }

    removeRow()
    {
        let score_coef = 0
        let removed_row: number[] = []
        this.board.forEach((row, i) => {

            if (row.every((block) => Piece.isTetrisBlock(block))) {
                row.fill(0)
                for (let x = i; x > 0; x--) {
                    this.board[x] = this.board[x - 1].map(item => item)
                }
                this.board[0].fill(0)

                removed_row.push(i);
                score_coef++
            }
        })

        this.score += ((10 * score_coef) + (5 * score_coef))
        return removed_row
    }

    drawCurrentPieceToBoard()
    {
        this.current_piece.forEachTetrisBlock((pos: Pos) => {
            this.board[pos.y][pos.x] = this.current_piece.color
        })
    }


    isBoardStarted()
    {
        return (this.board && this.state === BoardState.STARTED && this.current_piece)
    }

    toDTO()
    {
        const boardDTO: BoardDTO = {
            player: this.player.toDTO(),
            score: this.score,
            board: this.board,
            state: this.state
        }
        return boardDTO
    }

    toPieceUpdate(set_to_board: boolean) : UpdatePieceDTO {
        return {
            player_id: this.player.id,
            piece: this.current_piece.toDTO(),
            set_to_board: set_to_board
        }
    }

    toRemoveRows(rows: number[]) : RemoveRowsDTO {
        return {
            player_id: this.player.id,
            removed_rows: rows
        }
    }
}