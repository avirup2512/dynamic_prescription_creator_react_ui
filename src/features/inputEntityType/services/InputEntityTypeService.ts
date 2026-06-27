// src/services/api.service.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://freelancecollab.com/api";

class InputEntityTypeService {
  constructor() {

  }
  async createInputEntityType({ name, type, value }: { name: string; type: string; value: string }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type, value }),
      credentials: "include",
    });
    return response.json();
  }
  async getInputEntityTypes(typeName: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities?type_name=${typeName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getInputEntityTypeById(id: string, typeName: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/${id}?type_name=${typeName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async updateInputEntityType(id: string, { name, value }: { name: string; value: string }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, value }),
    });
    return response.json();
  }
  async deleteInputEntityType(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getByAllDropdownInputInformationById(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/dropdown/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async updateDropdownInputEntity(id: string, { name, newAddedOptions, existingOptions, removedOptionIds }: { name: string; newAddedOptions: any, existingOptions: any, removedOptionIds: any }): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/dropdown/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, newAddedOptions, existingOptions, removedOptionIds }),
    });
    return response.json();
  }
  async addSingleDropdownEntity(id: string, option: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/dropdown/addsingleOption/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, option }),
    });
    return response.json();
  }
  async getDropdownContentFromAI(text: string, inputType: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/input-entities/suggestdropdown`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text, inputType }),
    });
    return response.json();
  }
  async getFoodCategory(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/food-and-recipe/getFoodCategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getFoodByCategory(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/food-and-recipe/getFoodByCategory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getAllRecipesTagCategory(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/food-and-recipe/getrecipeTagCategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getRecipeTagByCategoryId(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/food-and-recipe/getTagByCategory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
  async getRecipeByTag(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/food-and-recipe/getRecipeByTag/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
}


export default new InputEntityTypeService();



