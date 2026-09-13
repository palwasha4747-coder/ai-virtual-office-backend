import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  type!: string;

  @Column()
  date!: string;

  @Column()
  status!: string;

  @Column()
  agent!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;
}