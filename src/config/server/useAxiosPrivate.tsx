import { useEffect } from 'react';
import { axiosPrivate } from './axios';
import useAxiosRequest from './useAxiosResquest';
import useAxiosResponse from './useAxiosResponse';

// get
// upload -> succes-> get

function useAxiosPrivate() {
  const { auth, onRequest, onRequestError } = useAxiosRequest();
  const { onResponse, onResponseError } = useAxiosResponse();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      onRequest,
      onRequestError
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      onResponse,
      onResponseError
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, onRequest, onRequestError, onResponse, onResponseError]);

  return axiosPrivate;
}

export default useAxiosPrivate;
