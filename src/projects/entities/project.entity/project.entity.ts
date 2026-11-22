
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  status!: string;

  @Column({ type: 'int', default: 0 })
  progress!: number;

  @Column()
  deadline!: string;

  @Column({ type: 'int', default: 1 })
  members!: number;

  @Column()
  agent!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
