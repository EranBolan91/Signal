import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getActivation, getActivationsDetails, getActivationSmsLogs } from "../database/activation";
import type { Activation } from "../types/activation";
import type { SmsLog } from "../types/smsLog";

type ActivationArgs = {
  getActivationsArgs?: Parameters<typeof getActivation>;
  useQueryOptions?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">;
};
type ActivationsDetailsArgs = {
  getActivationsArgs?: Parameters<typeof getActivationsDetails>;
  useQueryOptions?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">;
};

type ActivationSmsLogArgs = {
  getActivationSmsLogArgs?: Parameters<typeof getActivationSmsLogs>;
  useQueryOptions?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">;
};

export const useActivation = () => {
  const useGetActivation = (args?: ActivationArgs) => {
    return useQuery<Activation[]>({
      queryKey: ["activation", { ...args?.getActivationsArgs }],
      queryFn: async () => {
        const result = args && args.getActivationsArgs ? await getActivation(...args?.getActivationsArgs) : await getActivation();
        return result || [];
      },
      ...args?.useQueryOptions,
    });
  };

  const useGetActivationsDetails = (args?: ActivationsDetailsArgs) => {
    return useQuery<Activation[]>({
      queryKey: ["activationsDetails", { ...args?.getActivationsArgs }],
      queryFn: async () => {
        const result = args && args.getActivationsArgs ? await getActivationsDetails(...args?.getActivationsArgs) : await getActivationsDetails();
        return result || [];
      },
      ...args?.useQueryOptions,
    });
  };

  const useGetActivationSmsLogs = (args: ActivationSmsLogArgs) => {
    return useQuery<{ data: SmsLog[]; total: number }>({
      queryKey: ["activationSmsLogs", { ...args?.getActivationSmsLogArgs }],
      queryFn: async () => {
        const result = args && args?.getActivationSmsLogArgs && (await getActivationSmsLogs(...args?.getActivationSmsLogArgs));
        return result || { data: [], total: 0 };
      },
      ...args?.useQueryOptions,
    });
  };

  return { useGetActivation, useGetActivationsDetails, useGetActivationSmsLogs };
};
