import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { WsExceptionFilter} from '@nestjs/common';
import { WsAllExceptionsFilter } from "./filters/ws-all-exception.filter";

const PORT = 8000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: ['log']
  });
    app.enableCors();
    // app.useGlobalFilters(new WsAllExceptionsFilter())
  await app.listen(process.env.PORT);
}

bootstrap();
