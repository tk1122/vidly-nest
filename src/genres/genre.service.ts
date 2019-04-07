import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreEntity } from './genre.entity';
import { CreateGenreDto, UpdateGenreDto } from './dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll() {
    return this.genreRepository.find();
  }

  async findOne(id: number) {
    const genre = await this.genreRepository.findOne({ id: id });
    if (!genre) throw new NotFoundException('Genre not found');

    return genre;
  }

  async create(genreData: CreateGenreDto) {
    const genre = new GenreEntity();
    Object.assign(genre, genreData);

    return this.genreRepository.save(genre);
  }

  async update(id: number, genreData: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({ id: id });
    if (!genre) throw new NotFoundException('Genre not found');

    Object.assign(genre, genreData);

    return this.genreRepository.save(genre);
  }

  async remove(id: number) {
    const genre = await this.genreRepository.findOne({ id: id });
    if (!genre) throw new NotFoundException('Genre not found');

    return this.genreRepository.remove(genre);
  }
}
