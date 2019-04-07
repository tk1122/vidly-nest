import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { GenreEntity } from 'src/genres/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, GenreEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
