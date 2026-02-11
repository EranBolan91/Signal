import { Controller, Get, Param, Post, Query } from '@nestjs/common';
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
    console.log('query', query);
    return this.appService.getActivationDetails(query);
  }

  @Get('activationSmsLogs')
  getActivationSmsLogs(@Query() query: any) {
    return this.appService.getSmsLogs(query);
  }

  @Get('smsResponse')
  saveSmsReponse(@Query() query: any) {
    return this.appService.saveSmsReponseLog(query);
  }
}
