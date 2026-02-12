import { SmsResponseEntity } from 'src/entities/sms-response.entity';
import { ActivationEntity } from 'src/entities/activation.entity';
import { SmsLogEntity } from '../entities/sms-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

interface SaveSmsLogDto extends Partial<SmsLogEntity> {
  activationId: string | undefined;
  messageId: string | undefined;
  messageIdInt: number;
  errorCode: number;
  success: boolean;
  message: string;
  phone: string;
}

interface ActivationDto extends Partial<ActivationEntity> {
  activationId: string;
  date: Date;
  environment: 'תרגיל' | 'אמת';
}

// interface ActivationFilter {
//   id?: number;
//   status?: string;
//   userId?: number;
//   createdFrom?: Date;
//   createdTo?: Date;
//   search?: string;
// }

interface SmsLogFilter {
  activationId?: string;
  phone?: string;
  success?: boolean;
  errorCode?: number;
  page?: number;
  limit?: number;
}

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(SmsLogEntity)
    private readonly smsLogRepository: Repository<SmsLogEntity>,
    @InjectRepository(ActivationEntity)
    private readonly activationRepository: Repository<ActivationEntity>,
    @InjectRepository(SmsResponseEntity)
    private readonly smsReponseRepository: Repository<SmsResponseEntity>,
  ) {}

  async saveSmsLog(smsLogDto: SaveSmsLogDto): Promise<SmsLogEntity> {
    const smsLog = this.smsLogRepository.create(smsLogDto);
    return await this.smsLogRepository.save(smsLog);
  }

  async saveSmsResponseLog(
    smsResponseLogDto: Omit<
      SmsResponseEntity,
      'id' | 'activationId' | 'createdAt'
    >,
  ): Promise<SmsResponseEntity> {
    try {
      const smsResponseLog =
        this.smsReponseRepository.create(smsResponseLogDto);
      return await this.smsReponseRepository.save(smsResponseLog);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSmsLogs(
    filters: SmsLogFilter = {},
  ): Promise<{ data: SmsLogEntity[]; total: number }> {
    const {
      activationId,
      phone,
      success,
      errorCode,
      page = 1,
      limit = 20,
    } = filters;

    const qb = this.smsLogRepository
      .createQueryBuilder('sms')
      .orderBy('sms.createdAt', 'DESC');

    // 🔍 Dynamic filters
    if (activationId) {
      qb.andWhere('sms.activationId = :activationId', { activationId });
    }

    if (phone) {
      qb.andWhere('sms.phone LIKE :phone', { phone: `%${phone}%` });
    }

    if (success !== undefined) {
      qb.andWhere('sms.success = :success', { success });
    }

    if (errorCode !== undefined) {
      qb.andWhere('sms.errorCode = :errorCode', { errorCode });
    }

    // 📄 Pagination
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
    };
  }

  async getActivations(
    filter: Partial<ActivationEntity> = {},
  ): Promise<ActivationEntity[]> {
    const qb = this.activationRepository.createQueryBuilder('activation');
    if (filter.activationId) {
      qb.andWhere('activation.activationId = :activationId', {
        activationId: filter.activationId,
      });
    }

    // Search (example: email / code / name)
    // if (filter.search) {
    //   qb.andWhere(
    //     '(activation.email ILIKE :search OR activation.code ILIKE :search)',
    //     { search: `%${filter.search}%` },
    //   );
    // }
    qb.orderBy('activation.createdAt', 'DESC');

    return qb.getMany();
  }

  async saveActivation(
    activationDto: ActivationDto,
  ): Promise<ActivationEntity> {
    const activation = this.activationRepository.create(activationDto);
    return await this.activationRepository.save(activation);
  }

  async countSmsLogsBySuccess(
    activationId: string,
  ): Promise<{ success: number; failure: number; totalPhones: number }> {
    const raw = await this.smsLogRepository
      .createQueryBuilder('sms')
      .select('sms.success', 'success')
      .addSelect('COUNT(*)', 'count')
      .where('sms.activationId = :activationId', { activationId })
      .groupBy('sms.success')
      .getRawMany();

    let success = 0;
    let failure = 0;

    let totalPhones = raw[0]?.count;

    for (const row of raw) {
      if (row.success === 1 || row.success === true) {
        success = Number(row.count);
      } else {
        failure = Number(row.count);
      }
    }

    return { success, failure, totalPhones };
  }
}
