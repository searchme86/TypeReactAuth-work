import React from 'react';
import axios from '../server/axios';
import useAuth from './useAuth';

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    // console.log('<-------------Get refreshToken--------------------->');
    setAuth((prev) => {
      console.log(
        '[useRefreshToken.tsx] JSON.stringify(prev)',
        JSON.stringify(prev)
      );
      console.log(
        '[useRefreshToken.tsx] response.data.accessToken',
        response.data.accessToken
      );
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
