import apiClient from './apiClient';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};
