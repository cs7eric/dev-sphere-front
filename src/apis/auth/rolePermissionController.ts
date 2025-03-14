/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /rolePermission/add */
export async function addUsingPost2({
  body,
  options,
}: {
  body: API.AuthRolePermissionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/rolePermission/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
