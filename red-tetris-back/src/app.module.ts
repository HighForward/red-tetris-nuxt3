import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { PlayersModule } from "./players/players.module";
import { PiecesModule } from './pieces/pieces.module';

@Module({
  imports: [EventsModule, PlayersModule, ScheduleModule.forRoot(), GamesModule, PiecesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
