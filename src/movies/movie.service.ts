import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { GenreEntity } from 'src/genres/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll() {
    return this.movieRepository.find();
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({ id });
    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  async create(movieData: CreateMovieDto) {
    const genres = await this.genreRepository.findByIds(movieData.genreIds);
    if (genres.length !== movieData.genreIds.length)
      throw new BadRequestException('Genre(s) not found');

    const movie = new MovieEntity();
    Object.assign(movie, _.omit(movieData, 'genreIds'), { genres });

    return this.movieRepository.save(movie);
  }

  async update(id: number, movieData: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ id });
    if (!movie) throw new NotFoundException();

    if (movieData.genreIds) {
      const genres = await this.genreRepository.findByIds(movieData.genreIds);
      if (genres.length !== movieData.genreIds.length)
        throw new NotFoundException('Genre(s) not found');

      Object.assign(movie, _.omit(movieData, 'genreIds'), { genres });
    } else {
      Object.assign(movie, _.omit(movieData, 'genreIds'));
    }

    return this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({ id });
    if (!movie) throw new NotFoundException('Movie not found');

    return this.movieRepository.remove(movie);
  }
}
