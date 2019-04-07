import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { MovieEntity } from 'src/movies/movie.entity';

@Entity('genres')
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => MovieEntity, m => m.genres)
  movie: MovieEntity;
}
