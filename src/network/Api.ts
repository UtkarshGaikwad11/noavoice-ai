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



/* ===============================
   KNOWLEDGE BASE APIs
================================= */  
//  UPLOAD knowledge document
export const uploadKnowledgeApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return ApiClient.post(ENDPOINTS.UPLOAD_KNOWLEDGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

  
//delete knowledge document by ID
export const deleteKnowledgeDocumentApi = async (fileId: string) => {
  return ApiClient.delete(`/knowledge/${fileId}`);
}

// GET knowledge list
export const getKnowledgeListApi = async (params?: {
  search?: string;
  sort_by?: string;
  order?: string;
  limit?: number;
  offset?: number;
}) => {
  return ApiClient.get(ENDPOINTS.GET_KNOWLEDGE_LIST, {
    params: {
      search: params?.search || "",
      sort_by: params?.sort_by || "created_at",
      order: params?.order || "desc",
      limit: params?.limit || 10,
      offset: params?.offset || 0,
    },
  });
};

//phone numbers api
export const getPhoneNumbersApi = async () => {
  return ApiClient.get("/phone_numbers");
}