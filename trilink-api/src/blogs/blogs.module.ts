import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Author } from './entities';
import { BlogsService } from './services/blogs.service';
import { BlogsController } from './controllers/blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Author])],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
