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

//  GET agent by ID
export const getAgentByIdApi = async (id: string) => {
  return ApiClient.get(ENDPOINTS.GET_AGENT_BY_ID + id);
};


//  UPDATE agent by ID
export const updateAgentApi = async (id: string, data: {
  name?: string;
  description?: string; 
}) => {
  return ApiClient.put(ENDPOINTS.UPDATE_AGENT + id, data);
};

//  DELETE agent by ID
export const deleteAgentApi = async (id: string) => {
  return ApiClient.delete(ENDPOINTS.DELETE_AGENT + id);
};

/* ===============================
   PROMPTS APIs
================================= */    
//  GET prompt by ID
export const getPromptByIdApi = async (id: string) => {
  return ApiClient.get(ENDPOINTS.GET_PROMPT_BY_ID + `/${id}/prompt`);
};

//  UPDATE prompt by ID
export const updatePromptApi = async (id: string, data: {
  first_message?: string; 
  system_prompt?: string;
  end_call_message?: string;
}) => {
  return ApiClient.put(ENDPOINTS.UPDATE_PROMPT + `/${id}/prompt`, data);
};


//  DELETE prompt by ID
export const deletePromptApi = async (id: string) => {
  return ApiClient.delete(ENDPOINTS.DELETE_PROMPT + `/${id}/prompt`);
};