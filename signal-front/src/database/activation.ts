import { SmsLogSchema, type SmsLog } from "../types/smsLog";
import { activationSchema } from "../types/activation";
import type { Activation } from "../types/activation";
import api from "../api/api";

export const getActivation = async (filter = ""): Promise<Activation[] | null> => {
  try {
    console.log(filter);
    const response = await api.get("activations", { params: { filter } });
    if (response.data) {
      const validatedData = activationSchema.array().parse(response.data);
      return validatedData;
    }
    return [];
  } catch (error) {
    console.error("getActivation error:", error);
    throw error;
  }
};

export const getActivationsDetails = async (filter: Partial<Activation> = {}): Promise<Activation[] | null> => {
  try {
    const response = await api.get("activationsDetails", { params: { filter } });
    if (response.data) {
      const validatedData = activationSchema.array().parse(response.data);
      return validatedData;
    }
    return [];
  } catch (error) {
    console.error("getActivation error:", error);
    throw error;
  }
};

export const getActivationSmsLogs = async (activationId: string): Promise<{ data: SmsLog[]; total: number }> => {
  try {
    const response = await api.get("activationSmsLogs", { params: { activationId: activationId } });

    if (response.data) {
      const validatedData = SmsLogSchema.array().parse(response.data.data);
      return { data: validatedData, total: response.data.total };
    }
    return { data: [], total: 0 };
  } catch (error) {
    console.error("getActivation error:", error);
    throw error;
  }
};
