/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /share/article/add */
export async function addUsingPost({
  body,
  options,
}: {
  body: API.ShareArticleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/article/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /share/article/delete */
export async function deleteUsingDelete({
  body,
  options,
}: {
  body: API.ShareArticleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/article/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getArticleByCircle POST /share/article/getArticleByCircle */
export async function getArticleByCircleUsingPost({
  body,
  options,
}: {
  body: API.ShareArticleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareArticleDTO_>(
    '/share/article/getArticleByCircle',
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

/** query POST /share/article/query */
export async function queryUsingPost({
  body,
  options,
}: {
  body: API.ShareArticleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListShareArticleDTO_>('/share/article/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /share/article/update */
export async function updateUsingPost({
  body,
  options,
}: {
  body: API.ShareArticleDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/share/article/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
