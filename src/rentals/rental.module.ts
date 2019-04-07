import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movies/movie.entity';
import { CustomerEntity } from 'src/customers/customer.entity';
import { RentalEntity } from './rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, CustomerEntity, RentalEntity]),
  ],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
