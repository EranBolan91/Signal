import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();
//TODO: need to change the origin when deploying to production. only allow the frontend domain.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // allow all origins (safe for dev)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
