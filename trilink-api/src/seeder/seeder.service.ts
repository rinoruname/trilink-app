import { Injectable } from '@nestjs/common';
import { BlogSeeder } from './blog.seeder';

@Injectable()
export class SeederService {
  constructor(private readonly blogSeeder: BlogSeeder) {}

  async seed() {
    await this.blogSeeder.seed();
    console.log('Database seeding complete.');
  }
}
