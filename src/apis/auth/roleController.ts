/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /role/add */
export async function addUsingPost1({
  body,
  options,
}: {
  body: API.AuthRoleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/role/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /role/delete */
export async function deleteUsingDelete1({
  body,
  options,
}: {
  body: API.AuthRoleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/role/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /role/update */
export async function updateUsingPost1({
  body,
  options,
}: {
  body: API.AuthRoleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
