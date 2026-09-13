import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  email!: string;

  @Column({ type: 'text', nullable: true })
  profileImage!: string;

  @Column({ default: true })
  emailNotifications!: boolean;

  @Column({ default: true })
  taskNotifications!: boolean;

  @Column({ default: false })
  mobileNotifications!: boolean;

  @Column({ default: false })
  twoFactorAuthentication!: boolean;

  @Column({ default: true })
  automaticTasks!: boolean;

  @Column({ default: true })
  smartSuggestions!: boolean;

  @Column({ default: 'English' })
  language!: string;

  @UpdateDateColumn()
  updatedAt!: Date;
}