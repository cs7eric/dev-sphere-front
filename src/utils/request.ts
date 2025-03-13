import { notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:5000';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 120000, // 超时时间120秒
});

instance.interceptors.response.use(
  (response) => {
    // data解构
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response.status >= 300) {
      notification.error({
        message: error.response.data?.msg,
        duration: 2,
      });
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config) => {

  return config;
});

const request = async <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
) => {
  return await instance.request<T, T>({
    url,
    ...options,
  });
};

export default request