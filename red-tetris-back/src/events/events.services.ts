import { Injectable } from "@nestjs/common";
import { Server, Socket } from 'socket.io';
import { WsUser } from "../decorators/ws.user";


@Injectable()
export class EventsServices {

    public server: Server = null

    emitMessage(message: string, data: any)
    {
        this.server.emit(message, data)
    }

}