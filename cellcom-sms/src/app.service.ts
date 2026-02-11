import { DatabaseService } from './database/database.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { firstValueFrom } from 'rxjs';
import { randomInt } from 'crypto';
import csv from 'csv-parser';
import * as path from 'path';
import * as fs from 'fs';

type SmsLogRecord = {
  Success: boolean;
  MessageId: number;
  ErrorCode: number;
  MessageIdInt: number;
};

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}

  async sendSms() {
    const activationId = randomInt(10, 1000000).toString();
    const message = `שלום,
הודעה זו נשלחת לכלל המשרתים ביחידה במסגרת בדיקת נוכחות.
הדיווח חובה ומיידי.
השב/י בחזרה (מספר בלבד):
1 - מצבי תקין, במקום השירות
2 - מצבי תקין, מחוץ למקום השירות
3 - מצבי לא תקין, צרו עימי קשר`;

    try {
      const phones = await this.readPhonesFromCsv('src/signal_phones.csv');
      const utfMessage = Buffer.from(message, 'utf-8').toString();

      await this.databaseService.saveActivation({
        activationId,
        date: new Date(),
        environment: 'תרגיל',
      });

      for (const phone of phones) {
        try {
          const response = await firstValueFrom(
            this.http.get(
              `https://cellsms.cellcom.co.il/SmsGate/SmsGate2.asmx/SendSmsEx?username=BINMAN1&password=BINMAN1@&target=${phone}&source=0522199958&message=${encodeURIComponent(utfMessage)}&pushUrl=&validity=1440&replace=false&immediate=false&isBinary=false&deliveryReceipt=true&maxSegments=20`,
            ),
          );

          const parser = new XMLParser({
            ignoreAttributes: false,
            parseTagValue: true,
          });

          const doc = parser.parse(response.data);
          const sendSmsAck: SmsLogRecord[] = doc.ArrayOfSendSmsAck.SendSmsAck;
          const messageId = sendSmsAck[0].MessageId.toString();
          const errorCode = sendSmsAck[0].ErrorCode;
          const messageIdInt = sendSmsAck[0].MessageIdInt;
          const success = sendSmsAck[0].Success;

          // Save to database
          await this.databaseService.saveSmsLog({
            activationId,
            phone,
            message,
            success,
            messageId,
            errorCode,
            messageIdInt,
          });
        } catch (error) {
          console.error(`Error sending SMS to ${phone}:`, error);
          // Save failed attempt to database
          await this.databaseService.saveSmsLog({
            activationId,
            phone,
            message,
            success: false,
            messageId: undefined,
            errorCode: -1,
            messageIdInt: -1,
          });
        }
      }

      return { message: 'SMS batch sent successfully' };
    } catch (error) {
      console.error('Error in sendSms:', error);
      return { error: 'Failed to send SMS batch' };
    }
  }

  readPhonesFromCsv = (filePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const phones: string[] = [];

      const resolvedPath = path.resolve(filePath);

      if (!fs.existsSync(resolvedPath)) {
        return reject(new Error(`CSV file not found: ${resolvedPath}`));
      }

      fs.createReadStream(resolvedPath)
        .pipe(csv())
        .on('data', (row: Record<string, string>) => {
          if (row.phone) {
            phones.push(
              String(row.phone).replace(/“/g, '').replace(/”/g, '').trim(),
            );
          }
        })
        .on('end', () => {
          resolve(phones);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };

  async getSmsLogs(query?: any) {
    return this.databaseService.getSmsLogs(query);
  }

  async getActivations(filter: any) {
    return this.databaseService.getActivations(filter);
  }

  async getActivationDetails(query: any) {
    const activations = await this.databaseService.getActivations(query);

    if (activations.length > 0) {
      const promises = activations.map((activation) =>
        this.databaseService.countSmsLogsBySuccess(activation.activationId),
      );

      const results = await Promise.all(promises);

      const detailedActivations = activations.map((activation, index) => ({
        ...activation,
        ...results[index],
      }));

      return detailedActivations;
    } else {
      return [];
    }
  }

  async getActivationSmsLogs(query: any) {
    return this.databaseService.getSmsLogs(query);
  }

  async saveSmsReponseLog(query) {
    console.log('query', query);
    return this.databaseService.saveSmsResponseLog(query);
  }
}
