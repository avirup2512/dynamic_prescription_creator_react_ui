// src/services/api.service.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://cliniure.com/api";

class SectionService {
  constructor() {

  }
  async createSection({ data }: { data: any }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ data }),
    });
    return response.json();
  }
  async getAllSections(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/sections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getSectionById(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/sections/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async updateSection(id: string, { data }: { data: any }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/sections/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ data }),
    });
    return response.json();
  }
  async deleteSection(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/sections/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
}


export default new SectionService();



