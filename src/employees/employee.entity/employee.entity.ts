import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  status!: string;

  @Column()
  avatar!: string;
}