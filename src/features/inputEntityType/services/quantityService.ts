// src/services/api.service.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

class QuantityService {
  constructor() {
        
  }
  async createQuantity({ name, type, value }: { name: string; type: string; value: string }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/quantities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type, value }),
    });
    return response.json();
  }
  async getAllQuantity(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/quantities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  async getQuantityById(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/quantities/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  async updateQuantity(id: string, { name,newAddedOptions, existingOptions,removedOptionIds }: { name: string; newAddedOptions: string,existingOptions:string,removedOptionIds:string }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/quantities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,newAddedOptions,existingOptions,removedOptionIds }),
    });
    return response.json();
  }
  async deleteQuantity(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/quantities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}


export default new QuantityService();



