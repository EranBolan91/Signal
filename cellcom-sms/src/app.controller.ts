import { SmsResponseEntity } from './entities/sms-response.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cellcom')
  sendCellcomSms() {
    return this.appService.sendSms();
  }

  @Get('cellcom-logs')
  getSmsLogs() {
    return this.appService.getSmsLogs();
  }

  @Get('activations')
  getActivations(@Query() query: any) {
    return this.appService.getActivations(query);
  }

  @Get('activationsDetails')
  getActivationsDetails(@Query() query: any) {
    return this.appService.getActivationDetails(query);
  }

  @Get('activationSmsLogs')
  getActivationSmsLogs(@Query() query: any) {
    return this.appService.getSmsLogs(query);
  }

  @Get('smsResponse')
  saveSmsReponse(
    @Query()
    query: Omit<SmsResponseEntity, 'id' | 'activationId' | 'createdAt'>,
  ) {
    console.log(query);
    return this.appService.saveSmsReponseLog(query);
  }
}
