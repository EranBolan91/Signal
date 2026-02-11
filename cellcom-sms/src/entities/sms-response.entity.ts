import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sms-response')
export class SmsResponseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  activationId: string;

  @Column()
  target: string;

  @Column()
  source: string;

  @Column()
  text: string;

  @Column()
  text_utf8: string;

  @Column()
  mob_type: string;

  @Column()
  sm_no: string;

  @CreateDateColumn()
  createdAt: Date;
}
