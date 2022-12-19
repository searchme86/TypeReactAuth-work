import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import axios from '../server/axios';

function useAxiosPost<T, R>(
  url: string,
  args: T
): {
  response: R;
  axiosPost: () => void;
  loading: boolean;
  errorMessage: string;
} {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState<R | null>(null);

  const axiosPost = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(url, JSON.stringify(args), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setResponse(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('진입');
        console.log('error.response', error.response);
        if (!error?.response) {
          setErrorMessage('No Server Response');
        } else if (error.response?.status === 400) {
          setErrorMessage('Missing Username or Password');
        } else if (error.response?.status === 401) {
          setErrorMessage('Unauthorized');
        } else {
          setErrorMessage('Login Failed');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [url, args]);

  if (!response) {
    throw Error('logic Error');
  }

  return { response, axiosPost, loading, errorMessage };
}

export default useAxiosPost;
