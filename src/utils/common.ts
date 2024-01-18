/**
 * 全角英数字を半角に変換
 * @param {string} str
 * @returns {string} 半角英数字
 */
export const toHalfWidth = (str: string): string => {
  str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  return str;
};
