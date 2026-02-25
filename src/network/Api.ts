import ApiClient from "./ApiClient";
import { ENDPOINTS } from "./Endpoints";

/* ===============================
   AGENTS APIs
================================= */

//  GET all agents
export const getAgentsApi = async () => {
  return ApiClient.get(ENDPOINTS.GET_AGENTS);
};

//  CREATE new agent
export const createAgentApi = async (data: {
  name: string;
  description: string;
}) => {
  return ApiClient.post(ENDPOINTS.CREATE_AGENT, data);
};

// 🔹 GET single agent (if backend provides)
export const getAgentByIdApi = async (id: string) => {
  return ApiClient.get(`${ENDPOINTS.GET_AGENTS}${id}`);
};

// 🔹 UPDATE agent (if backend provides PUT)
export const updateAgentApi = async (
  id: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  return ApiClient.put(`${ENDPOINTS.GET_AGENTS}${id}`, data);
};

// 🔹 DELETE agent (if backend provides)
export const deleteAgentApi = async (id: string) => {
  return ApiClient.delete(`${ENDPOINTS.GET_AGENTS}${id}`);
};