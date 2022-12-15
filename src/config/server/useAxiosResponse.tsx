import { AxiosError, AxiosResponse } from 'axios';
import useRefreshToken from '../auth/useRefreshToken';
import { CustomAxiosRequestConfig } from '../../types/TypeIntercepter';
import { axiosPrivate } from './axios';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
}

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
      if (responseError.response && !prevRequest?.sent) {
        switch (responseError.response.status) {
          case StatusCode.Unauthorized:
            prevRequest.sent = true;
            try {
              const newAccessToken = await refresh();
              if (typeof newAccessToken === 'string') {
                prevRequest.headers![
                  'Authorization'
                ] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
              }
            } catch (error) {
              if (error instanceof AxiosError) {
                console.error(error);
              }
            }
            break;

          case StatusCode.Forbidden:
            prevRequest.sent = true;
            try {
              const newAccessToken = await refresh();
              if (typeof newAccessToken === 'string') {
                prevRequest.headers![
                  'Authorization'
                ] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
              }
            } catch (error) {
              if (error instanceof AxiosError) {
                console.error(error);
              }
            }
            break;
        }
      }
    }
    return Promise.reject(responseError);
  };

  return { refresh, onResponse, onResponseError };
}

export default useAxiosResponse;
