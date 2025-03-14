/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** changeStatus POST /user/changeStatus */
export async function changeStatusUsingPost({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/user/changeStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /user/delete */
export async function deleteUsingDelete2({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** doLogin GET /user/doLogin */
export async function doLoginUsingGet1({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingGET1Params;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSaTokenInfo_>('/user/doLogin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PUT /user/doLogin */
export async function doLoginUsingPut1({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingPUT1Params;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSaTokenInfo_>('/user/doLogin', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin POST /user/doLogin */
export async function doLoginUsingPost1({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingPOST1Params;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSaTokenInfo_>('/user/doLogin', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin DELETE /user/doLogin */
export async function doLoginUsingDelete1({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingDELETE1Params;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSaTokenInfo_>('/user/doLogin', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PATCH /user/doLogin */
export async function doLoginUsingPatch1({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.doLoginUsingPATCH1Params;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSaTokenInfo_>('/user/doLogin', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserInfo GET /user/getUserInfo */
export async function getUserInfoUsingGet({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultAuthUserDTO_>('/user/getUserInfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** register POST /user/register */
export async function registerUsingPost({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /user/update */
export async function updateUsingPost2({
  body,
  options,
}: {
  body: API.AuthUserDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
