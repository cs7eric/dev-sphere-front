/* eslint-disable */
// @ts-ignore

export type AuthPermissionDTO = {
  createdBy?: string;
  createdTime?: string;
  icon?: string;
  id?: number;
  isDeleted?: number;
  menuUrl?: string;
  name?: string;
  parentId?: number;
  permissionKey?: string;
  show?: number;
  status?: number;
  type?: number;
  updateBy?: string;
  updateTime?: string;
};

export type AuthRoleDTO = {
  createdBy?: string;
  createdTime?: string;
  id?: number;
  isDeleted?: number;
  roleKey?: string;
  roleName?: string;
  updateBy?: string;
  updateTime?: string;
};

export type AuthRolePermissionDTO = {
  id?: number;
  permissionId?: number;
  permissionIdList?: number[];
  roleId?: number;
};

export type AuthUserDTO = {
  avatar?: string;
  email?: string;
  extJson?: string;
  id?: number;
  introduce?: string;
  nickName?: string;
  password?: string;
  phone?: string;
  sex?: number;
  status?: number;
  userName?: string;
};

export type doLoginUsingDELETE1Params = {
  /** validCode */
  validCode: string;
};

export type doLoginUsingDELETEParams = {
  /** password */
  password?: string;
  /** username */
  username?: string;
};

export type doLoginUsingGET1Params = {
  /** validCode */
  validCode: string;
};

export type doLoginUsingGETParams = {
  /** password */
  password?: string;
  /** username */
  username?: string;
};

export type doLoginUsingPATCH1Params = {
  /** validCode */
  validCode: string;
};

export type doLoginUsingPATCHParams = {
  /** password */
  password?: string;
  /** username */
  username?: string;
};

export type doLoginUsingPOST1Params = {
  /** validCode */
  validCode: string;
};

export type doLoginUsingPOSTParams = {
  /** password */
  password?: string;
  /** username */
  username?: string;
};

export type doLoginUsingPUT1Params = {
  /** validCode */
  validCode: string;
};

export type doLoginUsingPUTParams = {
  /** password */
  password?: string;
  /** username */
  username?: string;
};

export type Result = {
  code?: number;
  data?: Record<string, unknown>;
  message?: string;
  success?: boolean;
};

export type ResultAuthUserDTO_ = {
  code?: number;
  data?: AuthUserDTO;
  message?: string;
  success?: boolean;
};

export type ResultSaTokenInfo_ = {
  code?: number;
  data?: SaTokenInfo;
  message?: string;
  success?: boolean;
};

export type SaTokenInfo = {
  isLogin?: boolean;
  loginDevice?: string;
  loginId?: Record<string, unknown>;
  loginType?: string;
  sessionTimeout?: number;
  tag?: string;
  tokenActiveTimeout?: number;
  tokenName?: string;
  tokenSessionTimeout?: number;
  tokenTimeout?: number;
  tokenValue?: string;
};
