import { SmsResponseEntity } from 'src/entities/sms-response.entity';
import { ActivationEntity } from 'src/entities/activation.entity';
import { SmsLogEntity } from '../entities/sms-log.entity';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([SmsLogEntity]),
    TypeOrmModule.forFeature([ActivationEntity]),
    TypeOrmModule.forFeature([SmsResponseEntity]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
