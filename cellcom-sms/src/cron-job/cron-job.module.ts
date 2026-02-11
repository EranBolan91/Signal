import { CronJobService } from './cron-job.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CronJobService],
})
export class CronJobModule {}
