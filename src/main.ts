import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const openApiConfig = new DocumentBuilder()
    .setTitle('iMazing Demo API')
    .setDescription('Exploration of exposing an API with Nest.js')
    .setVersion('1.0')
    .addTag('iMazing')
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api/ui', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT', 3000));
}
bootstrap();
