import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UseMutationState {
  loading: boolean;
  data?: any | undefined;
  error?: any | undefined;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

function useMutation(url: string): UseMutationResult {
  const [apiState, setApiState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const { loading, data, error } = apiState;

  const mutation = async (data?: any) => {
    try {
      setApiState((apiState) => ({ ...apiState, loading: true }));
      const response = axios({
        url,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data),
      });
      setApiState((apiState) => ({ ...apiState, data: response }));
    } catch (error) {
      if (error instanceof AxiosError) {
        setApiState((apiState) => ({ ...apiState, error }));
      }
    } finally {
      setApiState((apiState) => ({ ...apiState, loading: false }));
    }
  };

  return [mutation, { loading, data, error }];
}

export default useMutation;
