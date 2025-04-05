/* eslint-disable */
// @ts-ignore

export type CircleActionDTO = {
  circleId?: number;
  circleMemberList?: ShareCircleMemberDTO[];
  circleName?: string;
  id?: number;
  userName?: string;
};

export type InteractionDTO = {
  actionType?: string;
  targetId?: number;
  targetType?: string;
  userName?: string;
};

export type ResultBoolean_ = {
  code?: number;
  data?: boolean;
  message?: string;
  success?: boolean;
};

export type ResultListShareArticleDTO_ = {
  code?: number;
  data?: ShareArticleDTO[];
  message?: string;
  success?: boolean;
};

export type ResultListShareCircleDTO_ = {
  code?: number;
  data?: ShareCircleDTO[];
  message?: string;
  success?: boolean;
};

export type ResultListShareMomentDTO_ = {
  code?: number;
  data?: ShareMomentDTO[];
  message?: string;
  success?: boolean;
};

export type ResultString_ = {
  code?: number;
  data?: string;
  message?: string;
  success?: boolean;
};

export type ShareArticleDTO = {
  circleId?: number;
  collectCount?: number;
  content?: string;
  id?: number;
  isDeleted?: number;
  labelMappingDTOList?: ShareArticleLabelMappingDTO[];
  likeCount?: number;
  replyCount?: number;
  title?: string;
  userName?: number;
};

export type ShareArticleLabelMappingDTO = {
  articleId?: number;
  id?: number;
  isDeleted?: number;
  labelId?: number;
};

export type ShareCircleDTO = {
  categoryId?: number;
  circleIntro?: string;
  circleName?: string;
  icon?: string;
  id?: number;
  memberCount?: number;
  parentId?: number;
  userName?: string;
};

export type ShareCircleMemberDTO = {
  circleId?: number;
  id?: number;
  userName?: string;
};

export type ShareMomentDTO = {
  circleId?: number;
  collectCount?: number;
  content?: string;
  id?: number;
  keyword?: string;
  likeCount?: number;
  momentTitle?: string;
  picUrls?: string;
  replyCount?: number;
  userName?: number;
};
