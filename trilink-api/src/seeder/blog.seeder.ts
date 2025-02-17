import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author, Blog } from '../blogs/entities';

@Injectable()
export class BlogSeeder {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async seed() {
    let author = await this.authorRepository.findOne({
      where: { firstName: 'John', lastName: 'Doe' },
    });
    if (!author) {
      author = this.authorRepository.create({
        firstName: 'John',
        lastName: 'Doe',
      });
      await this.authorRepository.save(author);
    }

    const blogs = [
      {
        title: 'Getting Started with NestJS',
        category: 'Programming',
        content:
          'NestJS is a powerful framework for building scalable server-side applications...',
        author: author,
      },
      {
        title: 'TypeORM Relationships',
        category: 'Database',
        content:
          'Understanding relationships in TypeORM can streamline data interactions...',
        author: author,
      },
    ];

    await this.blogRepository.save(blogs);
    console.log('Blogs seeded.');
  }
}
