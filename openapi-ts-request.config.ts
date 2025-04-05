import type { GenerateServiceProps } from 'openapi-ts-request';

export default {
  schemaPath: './circle-openapi.json', // 本地openapi文件
  serversPath: './src/apis/circle', // 接口存放路径
  requestLibPath: '@/utils/request.ts'
} as GenerateServiceProps;