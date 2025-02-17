import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder/seeder.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from  './app.module';
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { eventContext } from 'aws-serverless-express/middleware';
import { configure as serverlessExpress } from '@codegenie/serverless-express';


async function swagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Trilink API')
    .setDescription('Trilink API description')
    .setVersion('1.0')
    .addTag('trilink-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  app.enableCors();

  await swagger(app);
 
  if (process.argv.includes('--seed')) {
    const seeder = app.get(SeederService);
    await seeder.seed();
  } else {
    await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
    Logger.log(`🚀 Trilink API is running on: http://localhost:4000`);
  } 
}

if (process.env.RUNS_ON === 'local' || process.env.RUNS_ON === 'aws-ecs') {
  bootstrap();
}

let cachedServer: any;

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(
      AppModule,
    );
    nestApp.enableCors();
    nestApp.use(eventContext());
    await swagger(nestApp);

    await nestApp.init();

    cachedServer= serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    cachedServer = await bootstrapServer();
    Logger.log('🚀 Trilink API server bootstrapped');
    return cachedServer(event, context)
};
