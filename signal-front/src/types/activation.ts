import { z } from "zod";

export const activationSchema = z.object({
  id: z.number(),
  environment: z.enum(["תרגיל", "אמת"]),
  activationId: z.string(),
  date: z.string(),
  status: z.enum(["תקין", "ממתין", "שגיאה"]).default("ממתין"),
  totalPhones: z.number().default(0),
  phonesResponses: z.number().default(0),
  success: z.number().default(0),
  createdAt: z.string(),
});

export type Activation = z.infer<typeof activationSchema>;
