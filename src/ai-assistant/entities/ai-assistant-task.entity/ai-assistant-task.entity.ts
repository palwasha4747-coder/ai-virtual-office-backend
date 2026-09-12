import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ai_assistant_tasks')
export class AIAssistantTaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  agent!: string;

  @Column()
  task!: string;

  @Column()
  priority!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  result!: string;

  @CreateDateColumn()
  createdAt!: Date;
}