import axios from '../server/axios';
import useAuth from './useAuth';

import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

interface requestRefeshTokenType {
  roles: number[];
  accessToken: string;
}

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const userRefreshedInfo: AxiosResponse<requestRefeshTokenType, any> =
        await axios.get('/refresh', {
          withCredentials: true,
        });

      const {
        data: { roles, accessToken },
      } = userRefreshedInfo;

      setAuth((currentUserInfo) => {
        return {
          ...currentUserInfo,
          roles,
          accessToken,
        };
      });

      return accessToken;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response);
        console.log('error.response', error.response);
      }
    }
  };
  return refresh;
}

export default useRefreshToken;
