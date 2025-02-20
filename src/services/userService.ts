import apiClient from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
}

export interface UserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export const fetchUsers = async (
  page: number,
  limit: number,
  search: string
): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/users', {
    params: { page, limit, search },
  });
  return response.data;
};

interface UserSearchResponse {
  id: string;
  name: string;
  email: string;
}

export const searchUsers = async (query: string): Promise<UserSearchResponse[]> => {
  const response = await apiClient.get<UserSearchResponse[]>('/users/search', {
    params: { query },
  });
  return response.data;
};

