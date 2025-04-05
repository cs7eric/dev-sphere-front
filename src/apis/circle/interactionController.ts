/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** collect POST /share/interactions/collect */
export async function collectUsingPost({
  body,
  options,
}: {
  body: API.InteractionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultString_>('/share/interactions/collect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** comment POST /share/interactions/comment */
export async function commentUsingPost({
  body,
  options,
}: {
  body: API.InteractionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultString_>('/share/interactions/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** join POST /share/interactions/join */
export async function joinUsingPost({
  body,
  options,
}: {
  body: API.InteractionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultString_>('/share/interactions/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** like POST /share/interactions/like */
export async function likeUsingPost({
  body,
  options,
}: {
  body: API.InteractionDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultString_>('/share/interactions/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
