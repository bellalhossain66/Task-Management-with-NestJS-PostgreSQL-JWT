import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { AppModule } from './app.module';

if (!global.crypto) {
 (global as any).crypto = crypto;
}

async function MainApp() {

  console.log('test')
  console.log(crypto.randomUUID());

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  app.enableCors();

  await app.listen(port, () => {
     console.log(`App is running on: http://localhost:${port}`);
  });

}
MainApp();
