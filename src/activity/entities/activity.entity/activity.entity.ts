import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('activities')
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  agent!: string;

  @Column()
  action!: string;

  @Column()
  time!: string;

  @CreateDateColumn()
  createdAt!: Date;
}