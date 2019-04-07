import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { MovieEntity } from 'src/movies/movie.entity';
import { CustomerEntity } from 'src/customers/customer.entity';

@Entity('rentals')
export class RentalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: 'double precision' })
  rentalFee: string;

  @ManyToOne(() => MovieEntity, m => m.rentals, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  movie: MovieEntity;

  @ManyToOne(() => CustomerEntity, c => c.rentals, {
    eager: true,
    onDelete: 'CASCADE',
  })
  customer: CustomerEntity;
}
