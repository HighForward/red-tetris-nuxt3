import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

const PORT = process.env.PORT
const WS_PORT = process.env.WS_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: ['log'],
  });
    app.enableCors();
    // app.useGlobalFilters(new WsAllExceptionsFilter())
  await app.listen(PORT);
  console.log(`API Listen on port ${PORT}`)
  console.log(`Loaded WS_PORT ${WS_PORT}`)
}

bootstrap();
