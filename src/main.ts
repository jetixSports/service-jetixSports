import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('JetixSports API Documentation')
    .setDescription('JetixSports API es un servicio robusto para la gestión deportiva que ofrece autenticación segura mediante JWT, control de accesos basado en roles (RBAC) y permisos granulares por recurso. El sistema permite administrar usuarios, deportes y eventos con validación estricta de datos a través de DTOs. Casi Todos los endpoints requieren autenticación con token Bearer en los headers. La API sigue convenciones RESTful y devuelve códigos HTTP estándar (200 para éxito, 400 para errores de validación, 401/403 para problemas de autenticación/permisos, y 500 para errores internos).  ')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
