import { ClassSerializerInterceptor, Logger, LogLevel } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import { join } from 'path';

import { AppModule } from '@/modules/app.module';

async function bootstrap() {
  // Configurar niveles de log basado en la variable de entorno
  const loggerLevel = process.env.LOGGER_LEVEL || 'log';
  const levelHierarchy: Record<string, LogLevel[]> = {
    verbose: ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'],
    debug: ['fatal', 'error', 'warn', 'log', 'debug'],
    log: ['fatal', 'error', 'warn', 'log'],
    warn: ['fatal', 'error', 'warn'],
    error: ['fatal', 'error'],
    fatal: ['fatal'],
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: levelHierarchy[loggerLevel] || ['fatal', 'error', 'warn', 'log'],
    },
  );

  await app.register(helmet);

  await app.register(rateLimit, {
    max: 10, // máximo 10 peticiones por minuto por IP
    timeWindow: '1 minute',
    ban: 2, // si excede el límite 2 veces, se banea temporalmente igual al timeWindow
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Has excedido el límite de peticiones, intenta más tarde.',
    }),
  });

  await app.register(fastifyStatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '4200');
  const node_env = configService.get<string>('NODE_ENV', 'PRODUCTION');

  if (node_env == 'DEVELOPMENT') {
    const config = new DocumentBuilder()
      .setTitle('RuedaYa')
      .setDescription('RuedaYa API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document, {
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
      ],
    });
  }

  app.enableCors({
    origin: [configService.get<string>('FRONT_URL') as string],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

void bootstrap();
