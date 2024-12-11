'use server';

import axios from 'axios';
import { NextResponse } from 'next/server';
import { handlerError } from '@/utils/handlerError';
import { ResponseError, ResponseSuccess } from '@/types/request';
import { GitUserResponse } from '@/types/git';


const API_BASE_URL = 'https://api.github.com/users';
const ERRORS = {
  INVALID_USERNAME: 'Nome de usuário inválido.',
};


export function validateUsername(username: FormDataEntryValue | null): string {
  if (!username || typeof username !== 'string') {
    throw new Error(ERRORS.INVALID_USERNAME);
  }
  return username;
}


export async function fetchGitHubUser(username: string): Promise<GitUserResponse> {
  const response = await axios.get<GitUserResponse>(`${API_BASE_URL}/${username}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}




function formatGitHubUserResponse(data: GitUserResponse): ResponseSuccess {
  const { login, followers, following, avatar_url, email, bio} = data;
  return { data : {login, followers, following, avatar_url, email, bio}, status: 200 };
}

export async function getGitHubUser(formData: FormData): Promise<ResponseSuccess | ResponseError> {
  try {
    const username = validateUsername(formData.get('name'));
    const userData = await fetchGitHubUser(username);
    return formatGitHubUserResponse(userData);
  } catch (error) {
    return handlerError(error);
  }
}
