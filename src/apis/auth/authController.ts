/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** doLogin GET /auth/doLogin */
export async function doLoginUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingGETParams;
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/doLogin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PUT /auth/doLogin */
export async function doLoginUsingPut({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingPUTParams;
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/doLogin', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin POST /auth/doLogin */
export async function doLoginUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingPOSTParams;
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/doLogin', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin DELETE /auth/doLogin */
export async function doLoginUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingDELETEParams;
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/doLogin', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PATCH /auth/doLogin */
export async function doLoginUsingPatch({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingPATCHParams;
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/doLogin', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** isLogin GET /auth/isLogin */
export async function isLoginUsingGet({
  options,
}: {
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/isLogin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** isLogin PUT /auth/isLogin */
export async function isLoginUsingPut({
  options,
}: {
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/isLogin', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** isLogin POST /auth/isLogin */
export async function isLoginUsingPost({
  options,
}: {
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/isLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** isLogin DELETE /auth/isLogin */
export async function isLoginUsingDelete({
  options,
}: {
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/isLogin', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** isLogin PATCH /auth/isLogin */
export async function isLoginUsingPatch({
  options,
}: {
  options?: { [key: string]: unknown };
}) {
  return request<Record<string, unknown>>('/auth/isLogin', {
    method: 'PATCH',
    ...(options || {}),
  });
}
