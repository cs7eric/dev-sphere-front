/**
 * 截断文本并在超出限制时显示省略号
 * @param {string} text - 原始文本
 * @param {number} maxLength - 最大允许长度（字符数）
 * @param {string} [ellipsis='...'] - 省略号样式
 * @returns {string} 截断后的文本
 */
export default function truncateText(text, maxLength, ellipsis = '...') {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + ellipsis;
}

/**
 * 将 Markdown 转换为纯文本（去除标记）
 * @param {string} mdText - Markdown 格式文本
 * @returns {string} 纯文本
 */
export function mdToPlainText(mdText) {
  return mdText
    .replace(/^#+\s+/gm, '')          // 去除标题 #
    .replace(/\*\*(.*?)\*\*/g, '$1')   // 去除加粗 **
    .replace(/\*(.*?)\*/g, '$1')       // 去除斜体 *
    .replace(/!\[.*?\]\(.*?\)/g, '')   // 去除图片 ![]()
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 保留链接文字，去除URL
    .replace(/`{3}[\s\S]*?`{3}/g, '')  // 去除代码块 ```
    .replace(/`(.*?)`/g, '$1')         // 去除行内代码 `
    .replace(/^- /gm, '')              // 去除无序列表 -
    .replace(/\n\s*\n/g, '\n')         // 合并多余空行
    .trim();
}