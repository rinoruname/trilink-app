import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly postsRepository: Repository<Blog>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.postsRepository.find({ relations: { author: true } });
  }

  findOne(id: number): Promise<Blog> {
    return this.postsRepository.findOne({
      where: { id },
      relations: { author: true },
    });
  }
}
