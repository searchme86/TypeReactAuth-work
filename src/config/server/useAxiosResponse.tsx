import { AxiosError, AxiosResponse } from 'axios';
import useRefreshToken from '../auth/useRefreshToken';
import { CustomAxiosRequestConfig } from '../../types/TypeIntercepter';
import { axiosPrivate } from './axios';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  NOT_FOUND = 404,
}

const getErrorMessage = (responseStatus: number) => {
  if (responseStatus === StatusCode.Forbidden) return '';
  // if (res)
};

const handlerByStatus = async (
  response: AxiosResponse,
  prevReq: CustomAxiosRequestConfig,
  refreshFunc: () => Promise<string | undefined>
) => {
  prevReq.sent = true;
  const errorMSg = getErrorMessage(response.status);

  try {
    const newAccessToken = await refreshFunc();
    if (typeof newAccessToken === 'string') {
      prevReq.headers!['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevReq);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
    }
  }
};

function useAxiosResponse() {
  const refresh = useRefreshToken();

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onResponseError = async (
    responseError: AxiosError
  ): Promise<AxiosError> => {
    if (responseError.config !== undefined) {
      const prevRequest: CustomAxiosRequestConfig = responseError?.config;
      const response = responseError.response;

      if (response && !prevRequest?.sent) {
        handlerByStatus(response, prevRequest, refresh);
      }
    }
    return Promise.reject(responseError);
  };

  return { refresh, onResponse, onResponseError };
}

export default useAxiosResponse;
