import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { RentalEntity } from './rental.entity';
import { Repository, Connection } from 'typeorm';
import { CustomerEntity } from 'src/customers/customer.entity';
import { MovieEntity } from 'src/movies/movie.entity';
import { CreateRentalDto } from './dto';
import * as _ from 'lodash';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(RentalEntity)
    private readonly rentalRepository: Repository<RentalEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll() {
    return this.rentalRepository.find();
  }

  async findOne(id: number) {
    const rental = await this.rentalRepository.findOne({ id });
    if (!rental) throw new NotFoundException('Rental not found');

    return rental;
  }

  async create(rentalData: CreateRentalDto) {
    const movie = await this.movieRepository.findOne({
      id: rentalData.movieId,
    });
    if (!movie) throw new NotFoundException('Movie not found');

    const customer = await this.customerRepository.findOne({
      id: rentalData.customerId,
    });
    if (!customer) throw new NotFoundException('Customer not found');

    if (movie.numberInStock === 0)
      throw new InternalServerErrorException('Movie out of stock');

    const rental = new RentalEntity();
    movie.numberInStock--;
    Object.assign(
      rental,
      _.omit(rentalData, ['movieId', 'customerId']),
      { movie },
      { customer },
    );

    return this.rentalRepository.save(rental);
  }

  async remove(id: number) {
    const rental = await this.rentalRepository.findOne({ id });
    if (!rental) throw new NotFoundException('Rental not found');

    rental.movie.numberInStock++;

    return this.rentalRepository.remove(rental);
  }
}
