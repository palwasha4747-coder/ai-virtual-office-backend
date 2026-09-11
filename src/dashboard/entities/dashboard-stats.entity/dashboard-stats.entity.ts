import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dashboard_stats')
export class DashboardStatsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  currentScore!: number;

  @Column()
  aiAgents!: number;

  @Column()
  projects!: number;
}