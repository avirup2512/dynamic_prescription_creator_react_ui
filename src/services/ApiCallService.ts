// src/services/api.service.ts

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

class APICallService {
    constructor()
    {
        
  }
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed`);
    }

    return response.json();
  }

  async post<T, B = unknown>(
    endpoint: string,
    body: B
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed`);
    }

    return response.json();
  }

  async put<T, B = unknown>(
    endpoint: string,
    body: B
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`PUT ${endpoint} failed`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`DELETE ${endpoint} failed`);
    }

    return response.json();
  }
}

export default new APICallService();



