import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SmsLogEntity } from './sms-log.entity';

@Entity('activation')
export class ActivationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activationId: string;

  @Column()
  date: Date;

  @Column({ type: 'text', enum: ['תרגיל', 'אמת'] })
  environment: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SmsLogEntity, (sms) => sms.activationId)
  smsLogs: SmsLogEntity[];
}
