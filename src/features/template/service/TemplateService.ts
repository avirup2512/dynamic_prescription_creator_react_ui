// src/services/api.service.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

class TemplateService {
  constructor() {
        
  }
  async createTemplate({ data }: { data:any }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/templates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data}),
    });
    return response.json();
  }
  async getAllTemplates(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/templates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  async getTemplateById(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  async updateTemplate(id: string, { data }: { data:any }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    return response.json();
  }
  async deleteTemplate(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}


export default new TemplateService();



