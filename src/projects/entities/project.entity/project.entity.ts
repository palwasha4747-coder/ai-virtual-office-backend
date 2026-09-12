import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  status!: string;

  @Column()
  progress!: number;

  @Column()
  deadline!: string;

  @Column()
  members!: number;

  @Column()
  agent!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}