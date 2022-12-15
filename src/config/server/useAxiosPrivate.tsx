import { useEffect } from 'react';
import { axiosPrivate } from './axios';
import useRefreshToken from '../auth/useRefreshToken';
import useAuth from '../auth/useAuth';
import { AxiosError } from 'axios';
import { CustomAxiosRequestConfig } from '../../types/TypeIntercepter';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
}

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (responseError: AxiosError) => {
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
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
