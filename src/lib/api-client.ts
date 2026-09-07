const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
  errors?: any;
}

class ApiClient {
  private getHeaders(isFormData = false): HeadersInit {
    const headers: Record<string, string> = {};

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("clinic_admin_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = `${API_BASE_URL}${path}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          searchParams.append(key, String(val));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) url += `?${queryString}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Xatolik yuz berdi");
    }
    return data;
  }

  async post<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Xatolik yuz berdi");
    }
    return data;
  }

  async put<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Xatolik yuz berdi");
    }
    return data;
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Xatolik yuz berdi");
    }
    return data;
  }

  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Fayl yuklashda xatolik");
    }
    return data.data;
  }
}

export const apiClient = new ApiClient();
export { API_BASE_URL };
