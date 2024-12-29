import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => {
            if (error.constraints) {
              return {
                field: error.property,
                error: Object.values(error.constraints).join(', '),
              };
            } else {
              return error;
            }
          }),
        );
      },
    }),
  );
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Article')
      .setDescription('Apis for article')
      .setVersion('1.0')
      .addTag('article')
      .build(),
    {
      operationIdFactory: (_controllerKey: string, methodKey: string) =>
        methodKey,
    },
  );
  SwaggerModule.setup('api', app, document);
  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port, () => new Logger().log(`Listening to port: ${port}`));
}
bootstrap();
