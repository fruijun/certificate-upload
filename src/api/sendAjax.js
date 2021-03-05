import { popover, showMask,hideMask, } from '@/utils/popMessage';
import request from '@/utils/request';
import sensors from '@/utils/sensors';
import store from '@/store/index';
import { getUUID } from '@/utils/common';

export async function sendAjax(data,options = {}){
    const asyncOptions = Object.assign({},options);
    if (asyncOptions.showLoading) {
      store.commit('UPDATE_BTNLOADING',true);// 显示loading
      document.getElementById('outer').style.position = 'fixed';
    }
    let optionsHeader = options.header || {};
    // console.log('options header',optionsHeader)
    const antiRepeatTokenId = getUUID();
    const response = await request(
        {
          url: data.url,
          method: data.method,
          headers: {
            'Content-Type':	'application/json',
            antiRepeatTokenId: antiRepeatTokenId,
            ...optionsHeader,
          },
          data: Object.assign({}, data.data),
        })
        .then(res => {
          return res.data})
        .catch(err => {//本地跑就隐藏
          console.log('sendAjax catch');
          console.log('err return',err);
            try {
              if (err.response) {
                // const description = { code: err.response.status, url: data.url, content: err.response.data };
                // sensors.track('get_exception', { type: '1', description: JSON.stringify(description) });
                // if (asyncOptions.errHandler) {
                //   asyncOptions.errHandler({
                //     respCode: err.response.status,
                //     respDesc: err.response.data,
                //   }, data.data);
                // }
              } else {
                // const description = { code: '9999', content: '网络不见了', url: data.url };
                // sensors.track('get_exception', { type: '1', description: JSON.stringify(description) });//神策
                if (asyncOptions.errHandler) {
                  asyncOptions.errHandler({
                    respCode: '9999',
                    respDesc: '网络不见了',
                  }, data.data);
                }
              }
            } catch (e) {
              console.log(e);
            }
            throw new Error('网络不见了');
          });
    if (asyncOptions.showLoading) {
      store.commit('UPDATE_BTNLOADING',false);// 关闭loading
      document.getElementById('outer').style.position = '';
    }
    try {
      // console.log('response',response)
      if (response.respCode && response.respCode.slice(0, 1) !== '2') {
        // const description = { code: response.respCode, url: data.url, content: response.respDesc };
        // sensors.track('get_exception', { type: '2', description: JSON.stringify(description) });
      }
    } catch (e) {
      console.error('response.respCode',e);
      console.log('url',data.url)
    }//神策
    // 有回调方法直接回调
    if (asyncOptions.callback) {
      return asyncOptions.callback(response, asyncOptions, data);
    }
    // console.log('res',response)
    //没有回调，统一错误处理
    if ((response.respCode && response.respCode.slice(0, 1) !== '2')) {
      if (asyncOptions.errHandler) {
        return asyncOptions.errHandler(response, data.data);
      }
      popover(response.respDesc || '操作失败，请重新尝试');
      throw new Error(response.respDesc);
    }
  return response;
}