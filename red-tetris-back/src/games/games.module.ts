import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesEventsGateway } from "./games-events.gateway";
import { PlayersModule } from "../players/players.module";
import { EventsModule } from "../events/events.module";

@Module({
    imports: [
        forwardRef(() => PlayersModule),
        forwardRef(() => EventsModule)],
    providers: [GamesService, GamesEventsGateway],
    exports: [GamesService]
})
export class GamesModule {}
