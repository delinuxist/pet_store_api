import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { Redis } from 'ioredis';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { createClient } from 'redis';

async function bootstrap() {
  // const redisClient = createClient({ url: process.env.REDIS_URL }).connect();
  // const RedisStore = connectRedis(session);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
  });
  app.use(
    session({
      // store: new RedisStore({ client: redisClient }),
      name: 'session_id',
      secret: 'dark-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Pet API')
    .setDescription('Api for Pets')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
