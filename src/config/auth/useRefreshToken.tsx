import React from 'react';
import axios from '../server/axios';
import useAuth from './useAuth';

import { AxiosResponse } from 'axios';

interface requestRefeshTokenType {
  roles: number[];
  accessToken: string;
}

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response: AxiosResponse<requestRefeshTokenType, any> =
      await axios.get('/refresh', {
        withCredentials: true,
      });
    console.log('response', response);
    // console.log('<-------------Get refreshToken--------------------->');
    setAuth((currentUserInfo) => {
      console.log('currentUserInfo', currentUserInfo);
      console.log(
        '[useRefreshToken.tsx] JSON.stringify(currentUserInfo)',
        JSON.stringify(currentUserInfo)
      );
      console.log(
        '[useRefreshToken.tsx] response.data.accessToken',
        response.data.accessToken
      );
      return {
        ...currentUserInfo,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
