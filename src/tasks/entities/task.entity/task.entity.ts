import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  status!: string;

  @Column()
  priority!: string;

  @Column()
  assignedTo!: string;

  @CreateDateColumn()
  createdAt!: Date;
}