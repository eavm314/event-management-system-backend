import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/config';
import { ValidationPrinterPipe } from './validation-pipes/validation.printer.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");
  app.enableCors();
  app.useGlobalPipes(new ValidationPrinterPipe());
  await app.listen(env.port);
}
bootstrap();
