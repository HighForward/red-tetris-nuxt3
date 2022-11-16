import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { PlayersModule } from "./players/players.module";
import { PiecesModule } from './pieces/pieces.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [EventsModule, PlayersModule, ScheduleModule.forRoot(), GamesModule, PiecesModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
