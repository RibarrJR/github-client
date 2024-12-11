import axios from 'axios';

const ERROR_MESSAGES = {
  API_RESPONSE_ERROR: 'Erro ao obter dados da API externa.',
  CONNECTION_ERROR: 'Falha ao conectar com a API externa.',
  UNEXPECTED_ERROR: 'Erro inesperado ao fazer a requisição.',
  UNKNOWN_ERROR: 'Erro desconhecido. Entre em contato com o suporte.',
};

interface ErrorDetails {
  status: number;
  message: string;
}

export function handlerError(error: any): ErrorDetails {
  if (axios.isAxiosError(error)) {
    return handleAxiosError(error);
  }

  console.error('Erro desconhecido', error);
  return createError(500, ERROR_MESSAGES.UNKNOWN_ERROR);
}

function handleAxiosError(error: any): ErrorDetails {
  if (error.response) {
    console.error('Erro na resposta:', error.response.data);
    return createError(error.response.status || 500, error.response.data?.message || ERROR_MESSAGES.API_RESPONSE_ERROR);
  } else if (error.request) {
    console.error('Erro na requisição:', error.request);
    return createError(503, ERROR_MESSAGES.CONNECTION_ERROR);
  } else {
    console.error('Erro inesperado:', error.message);
    return createError(500, ERROR_MESSAGES.UNEXPECTED_ERROR);
  }
}

function createError(status: number, message: string): ErrorDetails {
  return { status, message };
}
