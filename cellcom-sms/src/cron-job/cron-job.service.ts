import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger('CronJobService');

  @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    this.logger.log('Cron job running every minute');
  }
}
