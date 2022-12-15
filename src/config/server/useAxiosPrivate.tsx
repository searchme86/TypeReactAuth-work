import { useEffect } from 'react';
import { axiosPrivate } from './axios';
import useRefreshToken from '../auth/useRefreshToken';
import useAuth from '../auth/useAuth';
import { AxiosError } from 'axios';
import { CustomAxiosRequestConfig } from '../../types/TypeIntercepter';

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  console.log('refresh', refresh);
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
            console.log('2.prevRequest.sent, sent가 true?', prevRequest.sent);
            // useRefresh에서 받은 것을 newAccess토큰에 할당하고
            const newAccessToken = await refresh();
            //  그 newAccessToken을 헤더에 넣어서
            prevRequest.headers!['Authorization'] = `Bearer ${newAccessToken}`;
            console.log(
              '3. prevRequest의 headers의 Authorization',
              prevRequest.headers!['Authorization']
            );
            console.log(
              '4.axiosPrivate(prevRequest)',
              axiosPrivate(prevRequest)
            );
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
