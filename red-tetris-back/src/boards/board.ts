import Player, { PlayerDTO } from "../players/player";

interface Block {
    x: number
    y: number
    item: number[][]
}

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

export const pieces = [
    square, T, Z, L, I, Zr, Lr
]

export enum GameState
{
    Warm = 'WARM',
    Started = 'STARTED',
    Finished = 'FINISHED'
}

interface Pos {
    x: number
    y: number
}

interface BoardDTO {
    player: PlayerDTO
    state: GameState
    score: number
    board: Array<Array<number>>
    current_block?: Pos[]
}

export class Board
{
    player: Player
    state: GameState
    board: Array<Array<number>> = []
    current_block: Block = null
    block_loop: number[]
    block_index: number = 0
    score: number = 0

    constructor(owner: Player, block_loop: number[]) {

        this.player = owner
        this.state = GameState.Warm
        this.block_loop = block_loop

        for (let i = 0; i < 20; i++)
        {
            this.board[i] = new Array(10)

            for (let x = 0; x < 10; x++)
            {
                this.board[i][x] = 0
            }
        }
    }

    // gameLoop()
    // {
    //     const { board, malusRow } = this.blockFall()
    //
    //     if (!board)
    //     {
    //         this.updateBoard(this, this.getCurrentBoard())
    //         return { board: undefined, malusRow }
    //     }
    //     else
    //         this.updateBoard(this, board)
    //     return { board, malusRow }
    // }
    //
    // emitBoardToOthers(others: User[], tmpBoard: number[][])
    // {
    //     const currentBoardDTO = {
    //         player: {
    //             id: this.player.id,
    //             username: this.player.username,
    //             type: this.player.type
    //         },
    //         score: this.score,
    //         board: tmpBoard
    //     }
    //     others.forEach((user) => {
    //         user.socket.emit('getLobbyBoards', currentBoardDTO)
    //     })
    // }
    //
    // updateBoard(board: Board, tmp_board: number[][])
    // {
    //     let fakeBoard = this.toDTO()
    //
    //     fakeBoard.board = tmp_board
    //     this.player.socket.emit('updateBoard', fakeBoard)
    // }
    //
    //
    // isCurrentPiece()
    // {
    //     return this.current_block !== null;
    // }
    //
    // getLast10Pieces(index: number)
    // {
    //     let tmp = []
    //     for (let x = 0; x < 10; x++)
    //         tmp.push(pieces[this.block_loop[index + x]])
    //
    //     return tmp
    // }
    //
    //
    // getBlockWithPatern()
    // {
    //     let piece = pieces[this.block_loop[this.block_index]]
    //     if (this.block_index === 200)
    //         this.block_index = 0
    //
    //     if (this.block_index % 5 === 0)
    //         this.player.socket.emit('Last10Pieces', this.getLast10Pieces(this.block_index))
    //
    //     this.player.socket.emit('blockValidate', true)
    //
    //     this.block_index++
    //
    //     return piece
    // }
    //
    // setTetrisToBoard()
    // {
    //     const spawn_margin = 4
    //
    //     this.current_block = {
    //         y: 0,
    //         x: spawn_margin,
    //         item: this.getBlockWithPatern()
    //     }
    //
    //     return this.canBlockBeInserted(this.current_block.item);
    //
    // }
    //
    // isTetrisBlock(val: number)
    // {
    //     return [1, 2, 3, 4, 5, 6, 7, 9].includes(val)
    // }
    //
    // //false draw on copy and return, true draw on real board
    // drawBlock(board = false) : number[][]
    // {
    //     let block = this.current_block
    //
    //     let boardToDraw = undefined
    //
    //     if (!board)
    //         boardToDraw = JSON.parse(JSON.stringify(this.board));
    //     else
    //         boardToDraw = this.board
    //
    //     for (let y = 0; y < block.item.length; y++)
    //     {
    //         for (let x = 0; x < block.item.length; x++)
    //         {
    //             if (this.isTetrisBlock(block.item[y][x]))
    //                 boardToDraw[y + block.y][x + block.x] = block.item[y][x]
    //         }
    //     }
    //     return boardToDraw
    // }
    //
    // getLastBoundVertical(col: number)
    // {
    //     let lastHit = -1
    //
    //     let blockLength = this.current_block.item[0].length
    //
    //     for (let y = 0; y < blockLength; y++)
    //     {
    //         if (this.isTetrisBlock(this.current_block.item[y][col]))
    //             lastHit = y
    //     }
    //     return (lastHit === -1 ? -1 : lastHit + 1)
    // }
    //
    // getBoundsVertical()
    // {
    //     const pieceLength = this.current_block.item[0].length
    //
    //     for (let col = 0; col < pieceLength; col++)
    //     {
    //         const lastYBound = this.getLastBoundVertical(col)
    //
    //         if (lastYBound === -1)
    //             continue
    //
    //         if ((this.current_block.y + lastYBound > 19 || this.isTetrisBlock(this.board[this.current_block.y + lastYBound][this.current_block.x + col]))) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    //
    // getLastBoundHorizontal(row: number, block)
    // {
    //     let lastHit = -1
    //     let firstHit = -1
    //
    //     let blockLength = this.current_block.item[0].length
    //
    //     for (let x = 0; x < blockLength; x++)
    //     {
    //         if (this.isTetrisBlock(block[row][x])) {
    //             if (firstHit === -1)
    //                 firstHit = x
    //             lastHit = x
    //         }
    //     }
    //
    //     return ({firstHit: firstHit, lastHit: lastHit})
    // }
    //
    // getBoundsHorizontal(value: number, block = this.current_block.item)
    // {
    //     const pieceLength = this.current_block.item[0].length
    //
    //     for (let row = 0; row < pieceLength; row++) {
    //
    //         let {firstHit, lastHit} = this.getLastBoundHorizontal(row, block)
    //
    //         if (firstHit !== -1 && lastHit !== -1)
    //         {
    //             if (this.current_block.x + lastHit + value > 9)
    //                 return false
    //             if (this.current_block.x + firstHit + value < 0)
    //                 return false
    //             if (value > 0 && this.isTetrisBlock(this.board[this.current_block.y + row][this.current_block.x + lastHit + 1]))
    //                 return false
    //             if (value < 0 && this.isTetrisBlock(this.board[this.current_block.y + row][this.current_block.x + firstHit - 1]))
    //                 return false
    //         }
    //     }
    //     return true
    // }
    //
    // checkLastRow()
    // {
    //     return !!this.board[0].filter((item) => {
    //         return this.isTetrisBlock(item)
    //     }).length;
    // }
    //
    // removeFullRow()
    // {
    //     let score_coef = 0
    //     for (let row = 0; row < this.board.length; row++)
    //     {
    //         //return array empty on
    //         if (this.board[row].filter((block) => (block === 0 || block === 9) ).length === 0)
    //         {
    //             this.board[row] = this.board[row].fill(0)
    //
    //             while (row > 0)
    //             {
    //                 this.board[row] = this.board[row - 1].map((item) => { return item })
    //                 row--
    //             }
    //             this.board[0].fill(0)
    //             score_coef++
    //         }
    //     }
    //     this.score += ((10 * score_coef) + (5 * score_coef))
    //     return score_coef
    // }
    //
    // blockFall()
    // {
    //     let tmp_board = null
    //     let malusRow: number = 0
    //
    //     if (!this.isCurrentPiece()) {
    //         this.setTetrisToBoard()
    //     }
    //     //when block cant fall, process bounds and reset pieces
    //     else if (this.getBoundsVertical()) {
    //
    //         this.drawBlock(true)
    //         malusRow = this.removeFullRow()
    //
    //         //return null on no space left for next block (stop game)
    //         if (!this.setTetrisToBoard()) {
    //             this.state = GameState.Finished
    //             return {board: null, malusRow: {nb: 0, user: this.player}}
    //         }
    //     }
    //     else {
    //         this.current_block.y++
    //     }
    //
    //     tmp_board = this.drawBlock()
    //     return {board: tmp_board, malusRow: {nb: malusRow, user: this.player}}
    // }
    //
    // getCurrentBoard()
    // {
    //     return this.board
    // }
    //
    // performRotation()
    // {
    //     let element = this.current_block.item
    //     const length = element[0].length
    //     let new_array = []
    //
    //     for (let i = 0; i < length; i++)
    //     {
    //         let new_line = element.map((line) => { return line[i] } ).reverse()
    //         new_array.push(new_line)
    //     }
    //     return new_array
    // }
    //
    // canBlockBeInserted(rotated_block)
    // {
    //     let block = rotated_block
    //
    //     for (let y = 0; y < block.length; y++)
    //     {
    //         for (let x = 0; x < block.length; x++)
    //         {
    //             if (this.isTetrisBlock(block[y][x]) && y + this.current_block.y >= 0) {
    //
    //                 if (this.isTetrisBlock(this.board[y + this.current_block.y][x + this.current_block.x])) {
    //                     return false
    //                 }
    //
    //                 if (!this.getBoundsHorizontal(0, block))
    //                     return false
    //             }
    //         }
    //     }
    //     return true
    // }
    //
    // rotateTetris() : number[][]
    // {
    //     let rotated_block = this.performRotation()
    //     //check for outof bounds and if its not rotating on existing block
    //     if (this.canBlockBeInserted(rotated_block)) {
    //         this.current_block.item = rotated_block
    //     }
    //     this.updateBoard(this, this.drawBlock())
    //
    //     return this.drawBlock()
    // }
    //
    // translateTetris(value) : number[][]
    // {
    //     if (this.getBoundsHorizontal(value))
    //         this.current_block.x += value
    //
    //     return this.drawBlock()
    // }
    //
    // instantDown()
    // {
    //     while (!this.getBoundsVertical() && this.current_block) {
    //         this.current_block.y++
    //     }
    //     return this.blockFall()
    // }
    //
    // addUnbreakableRow(size: number)
    // {
    //     for (let y_pos = size; y_pos > 0; y_pos--)
    //     {
    //         if (this.current_block.y > 0)
    //             this.current_block.y--
    //     }
    //
    //     for (let x = 0; x < size; x++) {
    //         this.board.forEach((row, index) => {
    //             if (index < this.board.length - 1)
    //                 this.board[index] = this.board[index + 1]?.map((block) => block)
    //
    //             if (index == this.board.length - 1) {
    //
    //                 this.board[this.board.length - 1].fill(9);
    //             }
    //         })
    //     }
    //     this.updateBoard(this, this.drawBlock())
    // }
    //
    // getSpectreOfCurrentPiece()
    // {
    //     let spectre: Pos[] = []
    //     //to_do maybe do like that or print directly on backend ?_?
    //     // spectre.push({x: 0, y:0 })
    //     return spectre
    // }

    toDTO()
    {
        const boardDTO: BoardDTO = {
            player: this.player.toDTO(),
            score: this.score,
            board: this.board,
            // current_block: this.getSpectreOfCurrentPiece(),
            state: this.state
        }
        return boardDTO
    }
}