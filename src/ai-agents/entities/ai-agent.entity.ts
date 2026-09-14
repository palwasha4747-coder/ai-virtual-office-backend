import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ai_agents')
export class AIAgentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  role!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ default: 'Idle' })
  status!: string;

  @Column({ default: 0 })
  tasks!: number;

  @Column({ default: '100%' })
  accuracy!: string;

  @Column({ type: 'text', default: 'Waiting for new requests' })
  activity!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}