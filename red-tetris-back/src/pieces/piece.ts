import { Board } from "../boards/board";

const square = [
    [1, 1],
    [1, 1],
]

export const I = [
    [0, 0, 0, 0],
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]

const L = [
    [3, 0, 0],
    [3, 3, 3],
    [0, 0, 0],
]

const Lr = [
    [0, 0, 4],
    [4, 4, 4],
    [0, 0, 0],
]

const Z = [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
]

const T = [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
]

const Zr = [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
]

export const PIECES_AVAILABLE = [
    square, I, L, Lr, Z, T, Zr
]

export interface Pos {
    x: number
    y: number
}

export interface PieceDTO {
    pos: Pos[],
    color: number
}

export interface UpdatePieceDTO {
    player_id: string
    piece: PieceDTO
    set_to_board: boolean
}

export interface RemoveRowsDTO {
    player_id: string
    removed_rows: number[]
}

export class Piece {

    y: number
    x: number
    item: Array<Array<number>>
    color: number

    constructor() {
        const nb: number = Math.floor(Math.random() * 7)
        this.item = PIECES_AVAILABLE[nb]
        this.color = nb + 1
        this.y = 0;
        this.x = 0;
    }

    clone() {
        let cloned = new Piece()
        cloned.x = this.x
        cloned.y = this.y
        cloned.item = this.item
        cloned.color = this.color
        return cloned
    }

    static isTetrisBlock(val: number)
    {
        return [1, 2, 3, 4, 5, 6, 7, 9].includes(val)
    }

    performRotation()
    {
        let rotated_piece = []

        let curr_piece = this.item

        for (let i = 0; i < curr_piece.length; i++)
        {
            let new_line = curr_piece.map((line) => { return line[i] } ).reverse()
            rotated_piece.push(new_line)
        }

        this.item = rotated_piece
    }

    rotateTetris(board: Array<Array<number>>)
    {
        let piece_copy = JSON.parse(JSON.stringify(this.item));
        this.performRotation()
        if (!this.canBlockBeInserted(board)) {
            this.item = piece_copy
        }
    }

    translate(value: number, board: Array<Array<number>>) {
        if (this.getBoundsHorizontal(value, board)) {
            this.x += value
        }
    }

    fastDown(board: Array<Array<number>>) {
        if (this.getBoundsVertical(board)) {
            this.y += 1
        }
    }

    instantDown(board: Array<Array<number>>) {
        while (this.getBoundsVertical(board)) {
            this.y += 1
        }
    }

    getLastBoundVertical(col: number)
    {
        let lastHit = -1

        let blockLength = this.item.length

        for (let y = 0; y < blockLength; y++)
        {
            if (Piece.isTetrisBlock(this.item[y][col]))
                lastHit = y
        }
        return (lastHit === -1 ? -1 : lastHit + 1)
    }

    getBoundsVertical(board: Array<Array<number>>)
    {
        const pieceLength = this.item.length

        for (let col = 0; col < pieceLength; col++)
        {
            const lastYBound = this.getLastBoundVertical(col)

            if (lastYBound === -1)
                continue

            if ((this.y + lastYBound > 19 || Piece.isTetrisBlock(board[this.y + lastYBound][this.x + col]))) {
                return false
            }
        }
        return true
    }

    getLastBoundHorizontal(row: number)
    {
        let lastHit = -1
        let firstHit = -1

        let blockLength = this.item.length

        for (let x = 0; x < blockLength; x++)
        {
            if (Piece.isTetrisBlock(this.item[row][x])) {
                if (firstHit === -1)
                    firstHit = x
                lastHit = x
            }
        }

        return ({firstHit: firstHit, lastHit: lastHit})
    }

    getBoundsHorizontal(value: number, board: Array<Array<number>>)
    {
        const pieceLength = this.item.length

        for (let row = 0; row < pieceLength; row++) {

            let {firstHit, lastHit} = this.getLastBoundHorizontal(row)

            if (firstHit !== -1 && lastHit !== -1)
            {
                if (this.x + lastHit + value > 9)
                    return false
                if (this.x + firstHit + value < 0)
                    return false
                if (value > 0 && Piece.isTetrisBlock(board[this.y + row][this.x + lastHit + 1]))
                    return false
                if (value < 0 && Piece.isTetrisBlock(board[this.y + row][this.x + firstHit - 1]))
                    return false
            }
        }
        return true
    }

    forEachTetrisBlock(callback: Function) {
        for (let y = 0; y < this.item.length; y++)
        {
            for (let x = 0; x < this.item.length; x++)
            {
                if (Piece.isTetrisBlock(this.item[y][x])) {
                    callback({
                        y: y + this.y,
                        x: x + this.x,
                    })
                }
            }
        }
    }

    canBlockBeInserted(board: Array<Array<number>>)
    {
        let can_be_inserted: boolean = true
        this.forEachTetrisBlock((pos: Pos) => {

            if (!this.getBoundsHorizontal(0, board)) {
                can_be_inserted = false
                return
            }

            if (!this.getBoundsVertical(board)) {
                can_be_inserted = false
                return
            }

            if (Piece.isTetrisBlock(board[pos.y][pos.x])) {
                can_be_inserted = false
                return
            }
        })

        return can_be_inserted
    }

    //-- return an array of Pos { x, y }
    toDTO() : PieceDTO {
        let pos: Pos[] = []

        this.forEachTetrisBlock((item: Pos) => {
            pos.push(item)
        })

        return {
            pos: pos,
            color: this.color
        }
    }

}