import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service'
import { EventsServices } from "../events/events.services";
import { BoardsEventGateway } from "./boards-event.gateway";
import { PlayersModule } from "../players/players.module";
import { PiecesModule } from "../pieces/pieces.module";


@Module({
    imports: [PlayersModule, PiecesModule],
    controllers: [],
    providers: [BoardsService, BoardsEventGateway],
    exports: [BoardsService]
})

export class BoardsModule {}
