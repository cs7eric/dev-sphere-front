/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayBaselineResizeBehaviorEnum(
  field: API.BaselineResizeBehaviorEnum
) {
  return {
    CONSTANT_ASCENT: 'CONSTANT_ASCENT',
    CONSTANT_DESCENT: 'CONSTANT_DESCENT',
    CENTER_OFFSET: 'CENTER_OFFSET',
    OTHER: 'OTHER',
  }[field];
}

export function displayBaselineResizeBehaviorEnum2(
  field: API.BaselineResizeBehaviorEnum2
) {
  return {
    CONSTANT_ASCENT: 'CONSTANT_ASCENT',
    CONSTANT_DESCENT: 'CONSTANT_DESCENT',
    CENTER_OFFSET: 'CENTER_OFFSET',
    OTHER: 'OTHER',
  }[field];
}

export function displayBaselineResizeBehaviorEnum3(
  field: API.BaselineResizeBehaviorEnum3
) {
  return {
    CONSTANT_ASCENT: 'CONSTANT_ASCENT',
    CONSTANT_DESCENT: 'CONSTANT_DESCENT',
    CENTER_OFFSET: 'CENTER_OFFSET',
    OTHER: 'OTHER',
  }[field];
}

export function displayBaselineResizeBehaviorEnum4(
  field: API.BaselineResizeBehaviorEnum4
) {
  return {
    CONSTANT_ASCENT: 'CONSTANT_ASCENT',
    CONSTANT_DESCENT: 'CONSTANT_DESCENT',
    CENTER_OFFSET: 'CENTER_OFFSET',
    OTHER: 'OTHER',
  }[field];
}

export function displayModalExclusionTypeEnum(
  field: API.ModalExclusionTypeEnum
) {
  return {
    NO_EXCLUDE: 'NO_EXCLUDE',
    APPLICATION_EXCLUDE: 'APPLICATION_EXCLUDE',
    TOOLKIT_EXCLUDE: 'TOOLKIT_EXCLUDE',
  }[field];
}

export function displayTypeEnum(field: API.TypeEnum) {
  return { NORMAL: 'NORMAL', UTILITY: 'UTILITY', POPUP: 'POPUP' }[field];
}
