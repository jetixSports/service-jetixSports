import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
   app.enableCors({
    origin: '*', // Asegúrate que coincida con tu origen frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'token-session', // Añade tu header personalizado aquí
      'X-Requested-With',
      'Accept'
    ],
    exposedHeaders: ['token-session'], // Opcional: si necesitas leerlo en el frontend
    credentials: true, // Si estás usando credenciales
  });

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
