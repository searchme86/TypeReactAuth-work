import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import axios from '../server/axios';
import { AuthTokenShape } from '../context/AuthProvider';
import { SetStateAction } from 'react';

function useAxiosPost<T, U>(
  url: string,
  inputData: U,
  initialValue: T,
  setHandler: React.Dispatch<SetStateAction<AuthTokenShape>>
) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postdata, setPostData] = useState<T>(initialValue);

  const axiosPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post<T>(url, JSON.stringify(inputData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('data', data);
      // const accessToken = data.accessToken;
      // console.log('accessToken', accessToken);
      // const roles = data.roles;
      // console.log('roles', roles);
      setPostData(data);
      console.log('postData', postdata);
      console.log('여기가 문제인가? data', data);
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
  };

  return { postdata, axiosPost };
}

export default useAxiosPost;
