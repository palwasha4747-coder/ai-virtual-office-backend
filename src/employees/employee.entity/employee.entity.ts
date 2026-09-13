
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  role!: string;

  @Column()
  department!: string;

  @Column({ default: '' })
  email!: string;

  @Column({ default: '' })
  phone!: string;

  @Column()
  status!: string;

  @Column({ default: '' })
  avatar!: string;
}
