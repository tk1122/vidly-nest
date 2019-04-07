import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genres/genre.module';
import { Connection } from 'typeorm';
import { MovieModule } from './movies/movie.module';
import { CustomerModule } from './customers/customer.module';
import { RentalModule } from './rentals/rental.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GenreModule,
    MovieModule,
    CustomerModule,
    RentalModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
