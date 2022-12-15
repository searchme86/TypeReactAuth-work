import {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInterceptorManager,
  RawAxiosRequestHeaders,
  AxiosError,
  HeadersDefaults,
} from 'axios';

// const AxiosErrorTable = {
//   Unauthorized: 401,
//   Forbidden: 403,
// } as const;

// type AxiosErrorCategory = keyof typeof AxiosErrorTable;
// type AxiosErrorStatusNumber = typeof AxiosErrorTable[AxiosErrorCategory];

// type CustomAxiosResponseForm<T = any> = {
//   response: T;
// };
interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
  headers?: RawAxiosRequestHeaders;
}

export interface CustomAxiosInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}
