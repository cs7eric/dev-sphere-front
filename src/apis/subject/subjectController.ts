/* eslint-disable */
// @ts-ignore
import request from '@/utils/request.ts';

import * as API from './types';

/** add POST /subject/add */
export async function addUsingPost1({
  body,
  options,
}: {
  body: API.SubjectInfoDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultBoolean_>('/subject/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getSceneSubjectPage POST /subject/getSceneSubjectPage */
export async function getSceneSubjectPageUsingPost({
  body,
  options,
}: {
  body: API.SubjectInfoDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultPageResultSubjectInfoDTO_>(
    '/subject/getSceneSubjectPage',
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

/** getSubjectInfo POST /subject/getSubjectInfo */
export async function getSubjectInfoUsingPost({
  body,
  options,
}: {
  body: API.SubjectInfoDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultSubjectInfoDTO_>('/subject/getSubjectInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getSubjectPage POST /subject/getSubjectPage */
export async function getSubjectPageUsingPost({
  body,
  options,
}: {
  body: API.SubjectInfoDTO;
  options?: { [key: string]: unknown };
}) {
  return request<API.ResultPageResultSubjectInfoDTO_>(
    '/subject/getSubjectPage',
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
