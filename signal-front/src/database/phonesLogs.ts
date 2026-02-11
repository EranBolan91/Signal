import api from "../api/api";

export const getPhonesLogs = async (filter = "") => {
  const response = await api.get("/cellcom-logs", { params: { filter } });
  return response.data;
};
