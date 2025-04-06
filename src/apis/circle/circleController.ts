/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /share/circle/add */
export async function addUsingPost1({
  body,
  options,
}: {
  body: API.ShareCircleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/circle/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCircleListByCategory POST /share/circle/getCircleListByCategory */
export async function getCircleListByCategoryUsingPost({
  body,
  options,
}: {
  body: API.ShareCircleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareCircleDTO_>(
    '/share/circle/getCircleListByCategory',
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

/** getSubscribeListByUserId POST /share/circle/getSubscribeListByUserId */
export async function getSubscribeListByUserIdUsingPost({
  body,
  options,
}: {
  body: API.CircleActionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareCircleDTO_>(
    '/share/circle/getSubscribeListByUserId',
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

/** searchCircleByCircleName POST /share/circle/searchCircleBy */
export async function searchCircleByCircleNameUsingPost({
  body,
  options,
}: {
  body: API.CircleActionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareCircleDTO_>(
    '/share/circle/searchCircleBy',
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

/** subscribe POST /share/circle/subscribe */
export async function subscribeUsingPost({
  body,
  options,
}: {
  body: API.CircleActionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultString_>('/share/circle/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /share/circle/update */
export async function updateUsingPost1({
  body,
  options,
}: {
  body: API.ShareCircleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/circle/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
