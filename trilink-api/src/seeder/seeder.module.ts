import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { BlogSeeder } from './blog.seeder';
import { Blog, Author } from '../blogs/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Author])],
  providers: [SeederService, BlogSeeder],
  exports: [SeederService],
})
export class SeederModule {}
