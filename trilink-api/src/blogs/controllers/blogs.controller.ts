import { Controller, Get } from '@nestjs/common';
import { BlogsService } from '../services/blogs.service';
import { Blog } from '../entities';
import { ApiTags } from '@nestjs/swagger';


@Controller('/blogs')
@ApiTags('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll(): Promise<Blog[]> {
    return await this.blogsService.findAll();
  }
}
