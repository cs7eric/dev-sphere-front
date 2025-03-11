import type { GenerateServiceProps } from 'openapi-ts-request';

export default {
  schemaPath: './subject-openapi.json', // 本地openapi文件
  serversPath: './src/apis', // 接口存放路径
} as GenerateServiceProps;