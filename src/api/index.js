import request from '@/utils/request';
/**
 * 微信分享签名授权;
 * @param obj
 */
export function wxSignature(data, options) {
  return request({
      url: '/content/getConfig',
      method: 'get',
      params: data,
    },
    options,
  );
}

export function getCfg() {
  return request({
    url: `${process.env.VUE_APP_CFGURL}?timestamp=${new Date().getTime()}`,
    method: 'get',
  });
}
export function getJsTicketSign(data, options) {
  return request({
    url: 'wxplatform/getJsTicketSign',
    method: 'post',
    data,
  }, options)
}