import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {toast} from "@/registry/hooks/use-toast.ts";

// const BASE_URL = 'http://14.103.134.185:5000';
const BASE_URL = 'http://localhost:5000';

// 从 localStorage 中获取 用户信息
const getStoredUserInfo = () => {
  try {
    const userInfoStr = localStorage.getItem('userInfo');
    return userInfoStr ? JSON.parse(userInfoStr) : {};
  } catch (error) {
    console.error('Error parsing userInfo from localStorage:', error);
    return {};
  }
};


const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 120000, // 超时时间120秒
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  const userInfo = getStoredUserInfo();

  // 添加认证头
  if (userInfo.tokenName && userInfo.tokenValue) {
    config.headers[userInfo.tokenName] = `cccs7 ${userInfo.tokenValue}`;
  }

  // 添加loginId
  if (userInfo.loginId) {
    config.headers['loginId'] = userInfo.loginId;
  }

  return config;
})


//响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {


    // 成功响应处理
    const {success, code, message} = response.data



    // 处理未认证情况
    if (code === 401) {
      window.location.href = '/authentication';
      toast({
        variant: "info",
        title: "未登录",
        description: "请先登录"
      })
      return Promise.reject(new Error('未认证'));
    }

    if (success || code === 200) {
      return response.data;
    } else { // 业务逻辑错误（success=false 但 http status=200）
      toast({
        variant: "danger",
        title: "error!",
        description: "异常，请重新尝试"
      })
    }
    return response.data;
  },
  (error) => {
    // 处理网络错误
    const status = error.response?.status;
    let errorMessage = error.message;

    if (status === 401 || status === 403) {
      errorMessage = '请重新登录';
      window.location.href = '/login';
    } else if (status === 500) {
      errorMessage = '服务器内部错误';
    } else if (status === 503) {
      errorMessage = '服务不可用';
    }
    toast({
      variant: "danger",
      title: `请求错误 ${status || ''}`.trim(),
      description: errorMessage,
    });

    return Promise.reject(error)
  }
);


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