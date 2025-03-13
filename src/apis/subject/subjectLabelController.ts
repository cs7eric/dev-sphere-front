/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /subject/label/add */
export async function addUsingPost2({
  body,
  options,
}: {
  body: API.SubjectLabelDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/subject/label/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete DELETE /subject/label/delete */
export async function deleteUsingDelete1({
  body,
  options,
}: {
  body: API.SubjectLabelDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/subject/label/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryLabelByCategoryId POST /subject/label/queryLabelByCategoryId */
export async function queryLabelByCategoryIdUsingPost({
  body,
  options,
}: {
  body: API.SubjectLabelDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultListLabel_>(
    '/subject/label/queryLabelByCategoryId',
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

/** update POST /subject/label/update */
export async function updateUsingPost1({
  body,
  options,
}: {
  body: API.SubjectLabelDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.Result>('/subject/label/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
