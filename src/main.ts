import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server ready at: http://localhost:3000/graphql`)
  });
}
bootstrap()
