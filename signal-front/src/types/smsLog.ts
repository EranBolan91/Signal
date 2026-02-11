import { z } from "zod";

export const SmsLogSchema = z.object({
  id: z.number().int().positive(),
  activationId: z.string().nullable(),
  phone: z.string(),
  message: z.string(),
  success: z.boolean(),
  messageId: z.string().nullable(),
  errorCode: z.number().int().nullable(),
  messageIdInt: z.number().int().nullable(),
  createdAt: z.string(),
});

export type SmsLog = z.infer<typeof SmsLogSchema>;
