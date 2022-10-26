import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesEventsGateway } from "./games-events.gateway";
import { PlayersModule } from "../players/players.module";
import { EventsModule } from "../events/events.module";
import { BoardsModule } from "../boards/boards.module";
import { PiecesModule } from "../pieces/pieces.module";

@Module({
    imports: [
        forwardRef(() => PlayersModule),
        forwardRef(() => EventsModule),
        forwardRef(() => BoardsModule),
        forwardRef(() => PiecesModule)],
    providers: [GamesService, GamesEventsGateway],
    exports: [GamesService]
})
export class GamesModule {}
