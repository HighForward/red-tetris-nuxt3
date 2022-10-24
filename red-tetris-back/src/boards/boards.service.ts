import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { Server } from 'socket.io';
import Player from "../players/player";

@Injectable()
export class BoardsService {
    constructor(
        private schedulerRegistry: SchedulerRegistry
    ) {}

    isBoardStarted(user: Player)
    {
        // return (user.currentBoard && user.currentBoard.state === GameState.Started && user.currentBoard.current_block !== null)
    }


    rotateBlock(user: Player)
    {
        // if (this.isBoardStarted(user))
        // {
        //     const tmp_bord = user.currentBoard.rotateTetris()
        //     user.currentRoom.emitBoardToOthers(user, tmp_bord)
        // }
    }

    translateBlock(user: Player, value: number)
    {
        // if (this.isBoardStarted(user))
        // {
        //     const tmp_bord = user.currentBoard.translateTetris(value)
        //     user.currentBoard.updateBoard(user.currentBoard, tmp_bord)
        //     user.currentRoom.emitBoardToOthers(user, tmp_bord)
        // }
    }

    fastDown(user: Player, game_uid: string, server: Server)
    {
        // if (this.isBoardStarted(user))
        // {
        //     const others = user.currentRoom.getOthers(user)
        //     user.currentRoom.gameTrigger(user.currentBoard, others, this.schedulerRegistry, server)
        //
        // }
    }

    instantDown(user: Player, game_uid: string, server: Server)
    {
        // if (this.isBoardStarted(user))
        // {
        //     user.currentRoom.instantDown(user, this.schedulerRegistry, server)
        //     //fallback scheduler here, trigger by returned values
        // }
    }

}