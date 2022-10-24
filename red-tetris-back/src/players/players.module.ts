import { forwardRef, Module } from '@nestjs/common';
import { UsersEventsGateway } from "./users-events.gateway";
import { EventsModule } from "../events/events.module";
import { PlayersService } from "./players.service";

@Module({
    imports: [forwardRef(() => EventsModule)],
  providers: [PlayersService, UsersEventsGateway],
    exports: [PlayersService]
})
export class PlayersModule {}
