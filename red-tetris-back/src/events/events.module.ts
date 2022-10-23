import { forwardRef, Module } from "@nestjs/common";
import { AppGateway } from "./events.gateway";
import { EventsServices } from "./events.services";
import { PlayersModule } from "../users/players.module";
import { GamesModule } from "../games/games.module";

@Module({
    imports: [
        forwardRef(() => PlayersModule),
        forwardRef(() => GamesModule)],
    controllers: [],
    providers: [AppGateway, EventsServices],
    exports: [EventsServices],
})

export class EventsModule {
}

