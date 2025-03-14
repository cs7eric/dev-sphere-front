/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /permission/add */
export async function addUsingPost({
  body,
  options,
}: {
  body: API.AuthPermissionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/permission/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /permission/delete */
export async function deleteUsingDelete({
  body,
  options,
}: {
  body: API.AuthPermissionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/permission/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPermission GET /permission/getPermission */
export async function getPermissionUsingGet({
  body,
  options,
}: {
  body: API.AuthPermissionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/permission/getPermission', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /permission/update */
export async function updateUsingPost({
  body,
  options,
}: {
  body: API.AuthPermissionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/permission/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
