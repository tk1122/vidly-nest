import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { GenreEntity } from 'src/genres/genre.entity';
import { RentalEntity } from 'src/rentals/rental.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 10 })
  numberInStock: number;

  @Column({ type: 'double precision', default: 0 })
  dailyRentalRate: number;

  @ManyToMany(() => GenreEntity, g => g.movie, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  genres: GenreEntity[];

  @OneToMany(() => RentalEntity, r => r.movie)
  rentals: RentalEntity[];
}
