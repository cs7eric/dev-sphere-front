/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /subject/category/add */
export async function addUsingPost({
  body,
  options,
}: {
  body: API.SubjectCategoryDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/subject/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /subject/category/delete */
export async function deleteUsingDelete({
  body,
  options,
}: {
  body: API.SubjectCategoryDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/subject/category/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryCategoryByPrimary POST /subject/category/queryCategoryByPrimary */
export async function queryCategoryByPrimaryUsingPost({
  body,
  options,
}: {
  body: API.SubjectCategoryDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListSubjectCategoryDTO_>(
    '/subject/category/queryCategoryByPrimary',
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

/** queryPrimaryCategory POST /subject/category/queryPrimaryCategory */
export async function queryPrimaryCategoryUsingPost({
  body,
  options,
}: {
  body: API.SubjectCategoryDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListSubjectCategoryDTO_>(
    '/subject/category/queryPrimaryCategory',
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

/** update POST /subject/category/update */
export async function updateUsingPost({
  body,
  options,
}: {
  body: API.SubjectCategoryDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/subject/category/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
