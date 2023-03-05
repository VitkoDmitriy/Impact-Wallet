import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 9898;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Impact Wallet')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document)

  await app.listen(PORT, () => console.log(`Server started on port:  ${PORT}`));
}
start();
