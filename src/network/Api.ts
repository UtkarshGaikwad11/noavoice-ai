import ApiClient from "./ApiClient";
import { ENDPOINTS } from "./Endpoints";
import { getRequest } from "./ApiRequest";

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

// export const showAllAgents = () => {
//   return getRequest(ENDPOINTS.GET_AGENTS);
// };

