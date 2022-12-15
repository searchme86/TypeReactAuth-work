import { AxiosRequestConfig, AxiosError } from 'axios';
import useAuth from '../auth/useAuth';

function useAxiosRequest() {
  const { auth } = useAuth();

  const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
    if (!request.headers!['Authorization']) {
      request.headers!['Authorization'] = `Bearer ${auth?.accessToken}`;
    }
    return request;
  };

  const onRequestError = (requestError: AxiosError): Promise<AxiosError> =>
    Promise.reject(requestError);

  return { auth, onRequest, onRequestError };
}

export default useAxiosRequest;
