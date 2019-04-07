import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  async findAll() {
    return this.rentalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rentalService.findOne(id);
  }

  @Post()
  async create(@Body() rentalData: CreateRentalDto) {
    return this.rentalService.create(rentalData);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.rentalService.remove(id);
  }
}
