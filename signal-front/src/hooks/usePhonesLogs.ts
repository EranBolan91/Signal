import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getPhonesLogs } from "../database/phonesLogs";

type PhoneLogsArgs = {
  getPhonesLogsArgs?: Parameters<typeof getPhonesLogs>;
  useQueryOptions?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">;
};

export const usePhonesLogs = () => {
  const useGetPhonesLogs = (args?: PhoneLogsArgs) => {
    return useQuery({
      queryKey: ["phones-logs", { ...args?.getPhonesLogsArgs }],
      queryFn: () => (args && args.getPhonesLogsArgs ? getPhonesLogs(...args?.getPhonesLogsArgs) : getPhonesLogs()),
      ...args?.useQueryOptions,
    });
  };

  return { useGetPhonesLogs };
};
