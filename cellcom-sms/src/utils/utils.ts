import { SmsResponseEntity } from 'src/entities/sms-response.entity';

export const SOURCE_CELLCOM_PHONE = '0529991124';

export const isSmsResponse = (data: any): data is SmsResponseEntity => {
  return (
    typeof data.target === 'string' &&
    typeof data.source === 'string' &&
    typeof data.text === 'string' &&
    typeof data.text_utf8 === 'string' &&
    typeof data.mob_type === 'string' &&
    typeof data.sm_no === 'string'
  );
};

export const isValidTextUtf8 = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;

  return value === '1' || value === '2' || value === '3';
};
