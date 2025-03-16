/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** changeStatus POST /auth/user/changeStatus */
export async function changeStatusUsingPost({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/auth/user/changeStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /auth/user/delete */
export async function deleteUsingDelete2({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/auth/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** doLogin GET /auth/user/doLogin */
export async function doLoginUsingGet1({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingGET1Params;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSaTokenInfo_>('/auth/user/doLogin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserInfo POST /auth/user/getUserInfo */
export async function getUserInfoUsingPost({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultAuthUserDTO_>('/auth/user/getUserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** register POST /auth/user/register */
export async function registerUsingPost({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/auth/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /auth/user/update */
export async function updateUsingPost2({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/auth/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
