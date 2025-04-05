/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /share/moment/add */
export async function addUsingPost2({
  body,
  options,
}: {
  body: API.ShareMomentDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/moment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getMomentListByUserId POST /share/moment/getSubscribeListByUserId */
export async function getMomentListByUserIdUsingPost({
  body,
  options,
}: {
  body: API.ShareMomentDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareMomentDTO_>(
    '/share/moment/getSubscribeListByUserId',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** searchMoment POST /share/moment/searchCircleBy */
export async function searchMomentUsingPost({
  body,
  options,
}: {
  body: API.ShareMomentDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareMomentDTO_>(
    '/share/moment/searchCircleBy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** update POST /share/moment/update */
export async function updateUsingPost2({
  body,
  options,
}: {
  body: API.ShareMomentDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/moment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
