/**
 * 获取微信版本号
 * @export
 *
 */
export function getWXVersion() {
    const wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
    if (wechatInfo) {
      return wechatInfo[1];
    }
    return '';
  }
  /**
   * 获取ios版本号
   * @export
   *
   */
  export function getIOSVersion() {
    const agent = navigator.userAgent.toLowerCase();
    let version;
    if (agent.indexOf('like mac os x') > 0) {
      // ios
      const regStr_saf = /os [\d._]*/gi;
      const verinfo = agent.match(regStr_saf);
      version = (`${verinfo  }`).replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
    }
    return version;
  }
let inputBlurFlag;
inputBlurFlag = false;
let wxVersion;
let iosVersion;
function initVersion() {
    try {
      wxVersion = getWXVersion();
      iosVersion = getIOSVersion();
      if (wxVersion && wxVersion.length >= 5) {
        wxVersion = wxVersion.slice(0, 5);
      }
      if (wxVersion >= '6.7.4' && Number(iosVersion.slice(0, 2)) >= 12) {
        inputBlurFlag = true;
      }
    } catch (e) {
      console.log(e);
    }
  }
  initVersion();

/**
 * 兼容微信6.7.4在ios12上触控区上移的问题
 * 解决方案： 就是每次input、textarea  blur之后，手动windows.scrollTo
 * @export
 *
 */
export function inputBlurScroll() {
    try {
      if (inputBlurFlag) {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 300);
      }
    } catch (e) {
      console.log(e);
    }
  }