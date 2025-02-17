import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from './seeder/seeder.module';
import { readFileSync } from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.ENV === 'local' ? null : {
        ca: readFileSync("./config/certs/eu-central-1-bundle.pem").toString()
      }
    }),
    BlogsModule,
    SeederModule,
  ],
})
export class AppModule { }
