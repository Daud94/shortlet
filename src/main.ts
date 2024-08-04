import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Countries')
    .setDescription(`Rest Countries' API Integration`)
    .setVersion('1.0')
    .addTag('Countries')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env['PORT'];
  await app.listen(port);
}
bootstrap();
