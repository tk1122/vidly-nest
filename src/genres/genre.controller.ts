import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.genreService.findOne(id);
  }

  @Post()
  async create(@Body() genreData: CreateGenreDto) {
    return this.genreService.create(genreData);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() genreData: UpdateGenreDto,
  ) {
    return this.genreService.update(id, genreData);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.genreService.remove(id);
  }
}
