import { sendAjax } from '@/api/sendAjax';

/**
 * 注册初始jsbridge回调
 *
 * @export
 * @param {any} callback
 * @returns
 */
export function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}
const isMock = process.env.NODE_ENV === "development";
//获取app拍照或选图
export function getMultiImages(param, cb) {
  if(isMock){
    return sendAjax({
      url: "/mock/getMultiImages.json",
      method: 'get',
      param,
    }, cb);
  } else {
    setupWebViewJavascriptBridge(bridge => {
      bridge.callHandler('getMultiImages', param, cb);
    });
  }
}
//借款记录信息
export function getLoanAccountInfo(param,cb) {
  if(isMock){
    return sendAjax({
      url: "/mock/getLoanAccountInfo.json",
      method: 'get',
      param,
    }, cb);
  } else {
    setupWebViewJavascriptBridge(bridge => {
      console.log('call getLoanAccountInfo')
      console.log('param',param)
      console.log('cb',cb)
      // bridge.callHandler('getLoanAccountInfo',param,cb);
      bridge.callHandler('getLoanAccountInfo',param,cb);
    });
  }
}
export function getCipToken(param,cb) {
    setupWebViewJavascriptBridge(bridge => {
      console.log('getCipToken')
      bridge.callHandler('getCipToken', param,cb);
    });
}

/**
 * 拍照函数
 *
 * @export
 * @param {any} 入参
 * @param {any} 回调
 */
export function commonTakePhoto(param, cb) {
  // alert("takePhoto");
  setupWebViewJavascriptBridge(bridge => {
    bridge.callHandler('showNativeCamera', param, cb);
  });
}

/**
 * 关闭webview
 *
 * @export
 */
export function closeWebView() {
  setupWebViewJavascriptBridge(bridge => {
    bridge.callHandler('closeNativePage');
  });
}

/**
 * 设置title
 *
 * @export
 * @param {any} title
 */
export function setTitle(title) {
  // alert(window.WebViewJavascriptBridge);
  setupWebViewJavascriptBridge(bridge => {
    // alert("test");
    bridge.callHandler('modifyNativeTitle', { nativeTitle: title });
  });
}

/**
 * 禁用手势
 *
 * @export
 */
export function disabledGestrueReturn() {
  setupWebViewJavascriptBridge(bridge => {
    bridge.callHandler('interactiveNativePopDisabled');
  });
}

/**
 *
 *
 * @export
 * @param {any} cb
 */
export function listenBack(cb) {
  setupWebViewJavascriptBridge(bridge => {
    /* Initialize your app here */
    /* 注册JS端的回调函数 */
    // alert("listenBack");
    bridge.callHandler('backToFrontPageNativeCallBack', { isShielded: '1' }, cb);
  });
}
export function removeListenBack() {
  setupWebViewJavascriptBridge(bridge => {
    bridge.callHandler('backToFrontPageNativeCallBack', { isShielded: '0' });
  });
}
