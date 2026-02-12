import { ActivationEntity } from './entities/activation.entity';
import { CronJobService } from './cron-job/cron-job.service';
import { DatabaseModule } from './database/database.module';
import { CronJobModule } from './cron-job/cron-job.module';
import { SmsLogEntity } from './entities/sms-log.entity';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SmsResponseEntity } from './entities/sms-response.entity';

@Module({
  imports: [
    HttpModule,
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || './cellcom_sms.db',
      entities: [SmsLogEntity, ActivationEntity, SmsResponseEntity],
      synchronize: true,
      //logging: ['query', 'error'],
    }),
    DatabaseModule,
    CronJobModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronJobService],
})
export class AppModule {}
