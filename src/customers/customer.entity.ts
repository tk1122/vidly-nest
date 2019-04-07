import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RentalEntity } from 'src/rentals/rental.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  isGold: boolean;

  @OneToMany(() => RentalEntity, r => r.customer)
  rentals: RentalEntity[];
}
