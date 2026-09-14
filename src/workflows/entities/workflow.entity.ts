import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workflows')
export class WorkflowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ default: 'Active' })
  status!: string;

  @Column({ default: 0 })
  steps!: number;

  @Column({ default: 0 })
  completedRuns!: number;

  @Column({ default: 0 })
  successRate!: number;

  @Column({ default: 'Manager Agent' })
  agent!: string;

  @Column({ default: 'Waiting for new trigger' })
  activity!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}