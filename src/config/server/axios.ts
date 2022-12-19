import axios from 'axios';
import { CustomAxiosInstance } from '../../types/TypeIntercepter';

const BASE_URL = 'http://localhost:3500';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate: CustomAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 인가, 인증
// authz, authn
// not found - authn
// forbbiden - authz
