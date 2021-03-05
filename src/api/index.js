import { sendAjax } from '@/api/sendAjax';
export function getCfg() {
  return sendAjax({
    url: `${process.env.VUE_APP_CFGURL}?timestamp=${new Date().getTime()}`,
    method: 'get',
  });
}
const isMock = process.env.NODE_ENV === "development";
export function uploadLoanUsages(data, options) {
  const url = isMock ? "uploadLoanUsages.json":"loan/uploadLoanUsages";
  const method = isMock ? 'get':'post'
  return sendAjax({
    url: url,
    method: method,
    data,
  }, options)
}
export function queryLoanAccountUsageInfo(data, options) {
  const url = isMock ? "queryLoanAccountUsageInfo.json":"loan/queryLoanAccountUsageInfo";
  const method = isMock ? "get":'post';
  return sendAjax({
    url: url,
    method: method,
    data,
  }, options)
}

/**
 * 获取防重token，对应旧接口getNewTokenName
 */
export function getAntiRepeatToken() {
  const url = isMock ? "getAntiRepeatToken.json":"common/token/getAntiRepeatToken";
  const method = isMock ? "get":'post';
  return sendAjax({
    url: url,
    method: method,
  });
};
/**
 * 图片上传接口
 */
export function uploadPicture(data, options) {
  const url = isMock ? "uploadPicture.json":"common/uploadPicture";
  const method = isMock ? "get":'post';
  return sendAjax({
    url: url,
    method: method,
    data,
  }, options);
}
