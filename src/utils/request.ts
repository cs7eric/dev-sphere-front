import axios, {AxiosRequestConfig} from 'axios';
import {toast} from "@/registry/hooks/use-toast.ts";

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
    // 成功响应处理
    const {success, code, message} = response.data
    if (success || code === 200) {
      toast({
        variant: "success",
        title: "操作成功",
        description: message || "请求已完成"
      })
    } else { // 业务逻辑错误（success=false 但 http status=200）
      toast({
        variant: "danger",
        title: "业务错误",
        description: message || "操作未成功"
      })
    }
    return response.data;
  },
  (error) => {
    // 统一错误处理
    // 网络错误处理
    const responseData = error.response?.data || {}
    const errorMessage = responseData.message ||
      error.message ||
      `请求失败 (${error.response?.status || '未知错误'})`

    toast({
      variant: "danger",
      title: responseData.code ? `错误代码 ${responseData.code}` : "网络错误",
      description: errorMessage,
    })

    return Promise.reject(error)
  }
);

instance.interceptors.request.use((config) => {

  return config;
});

const request = async <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {},
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
) => {
  return await instance.request<T, T>({
    url,
    ...options,
  });
};

export default request