import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('calendar_events')
export class CalendarEventEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  time!: string;

  @Column()
  title!: string;

  @Column()
  detail!: string;

  @CreateDateColumn()
  createdAt!: Date;
}