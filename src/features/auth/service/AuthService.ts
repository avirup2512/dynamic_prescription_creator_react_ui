const API_BASE_URL = import.meta.env.VITE_API_URL || "https://cliniure.com/api";

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  is_active: number;
  created_at: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

interface RegisterResponse {
  success: boolean;
  data: User;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

interface ErrorResponse {
  success: false;
  message: string;
}

// Shared fetch wrapper: attaches the auth token, sends/receives JSON,
// and throws a plain Error using the API's message on non-2xx responses.
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = { credentials: "include" },
  fallbackError: string
): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(fallbackError);
    }
    throw new Error('Unexpected response from server');
  }

  if (!response.ok) {
    throw new Error((body as ErrorResponse)?.message ?? fallbackError);
  }

  return body as T;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...payload })
    });
    return response.json();
  },

  async login(payload: LoginPayload): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...payload })
    });
    return response.json();
  },

  async forgotPassword(email: string): Promise<string> {
    const { message } = await apiFetch<MessageResponse>(
      '/auth/forgot-password',
      { method: 'POST', body: JSON.stringify({ email }) },
      'Failed to send reset link'
    );
    return message;
  },

  async resetPassword(token: string, newPassword: string): Promise<string> {
    const { message } = await apiFetch<MessageResponse>(
      '/auth/reset-password',
      { method: 'POST', body: JSON.stringify({ token, newPassword }) },
      'Failed to reset password'
    );
    return message;
  },
  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  },
  async verifyMe(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
};

export default authService;