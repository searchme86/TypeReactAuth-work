import { useEffect } from 'react';
import { axiosPrivate } from './axios';
import useRefreshToken from '../auth/useRefreshToken';
import useAuth from '../auth/useAuth';
import { AxiosError } from 'axios';
import { CustomAxiosRequestConfig } from '../../types/TypeIntercepter';

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
          if (
            (responseError?.response?.status === 403 && !prevRequest?.sent) ||
            (responseError?.response?.status === 401 && !prevRequest?.sent)
          ) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers!['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
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
