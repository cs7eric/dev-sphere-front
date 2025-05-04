import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {toast} from "@/registry/hooks/use-toast.ts";

// 重试配置
const RETRY_CONFIG = {
  maxRetries: 3,        // 最大重试次数
  initialDelayMs: 1000, // 初始延迟时间（毫秒）
  backoffFactor: 2,     // 退避因子，每次重试延迟时间会乘以这个因子
  statusCodesToRetry: [408, 429, 500, 502, 503, 504], // 需要重试的HTTP状态码
};

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
  async (error) => {
    const { config } = error;
    
    // 如果没有config，说明不是请求错误，直接拒绝
    if (!config) {
      return Promise.reject(error);
    }
    
    // 设置重试计数器
    config.__retryCount = config.__retryCount || 0;
    
    // 获取错误状态码
    const status = error.response?.status;
    let errorMessage = error.message;
    
    // 判断是否需要重试
    const shouldRetry = (
      // 检查是否达到最大重试次数
      config.__retryCount < RETRY_CONFIG.maxRetries && 
      // 检查是否是需要重试的状态码
      (RETRY_CONFIG.statusCodesToRetry.includes(status) || !error.response) &&
      // 排除认证错误，这类错误重试也无法解决
      status !== 401 && 
      status !== 403
    );
    
    if (shouldRetry) {
      // 增加重试计数
      config.__retryCount += 1;
      
      // 计算延迟时间（使用指数退避策略）
      const delayMs = RETRY_CONFIG.initialDelayMs * Math.pow(RETRY_CONFIG.backoffFactor, config.__retryCount - 1);
      
      // 显示重试提示
      toast({
        variant: "default",
        title: `请求重试 (${config.__retryCount}/${RETRY_CONFIG.maxRetries})`,
        description: `正在重试请求，请稍候...`,
      });
      
      // 延迟一段时间后重试
      await new Promise(resolve => setTimeout(resolve, delayMs));
      
      // 重新发送请求
      return instance(config);
    }
    
    // 如果不需要重试或已达到最大重试次数，则显示错误信息
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

    return Promise.reject(error);
  }
);


const request = async <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {},
) => {
  // 确保每个请求都有初始的重试计数
  const requestOptions = {
    ...options,
    __retryCount: 0
  };

  return await instance.request<T, T>({
    url,
    ...requestOptions,
  });
};

export default request