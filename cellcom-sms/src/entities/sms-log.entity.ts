import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ActivationEntity } from './activation.entity';

@Entity('sms_logs')
export class SmsLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => ActivationEntity, (activation) => activation.smsLogs)
  // @JoinColumn({ name: 'activationId', referencedColumnName: 'activationId' })
  // activation: ActivationEntity;

  @Column({ nullable: true })
  activationId: string;

  @Column()
  phone: string;

  @Column('text')
  message: string;

  @Column()
  success: boolean;

  @Column({ nullable: true })
  messageId: string;

  @Column({ nullable: true })
  errorCode: number;

  @Column({ nullable: true })
  messageIdInt: number;

  @CreateDateColumn()
  createdAt: Date;
}
