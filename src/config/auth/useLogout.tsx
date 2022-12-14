import React from 'react';
import axios from '../server/axios';
import useAuth from './useAuth';

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({ pwd: '', roles: [], accessToken: '', user: '' });
    try {
      const response = await axios('/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
}

export default useLogout;
