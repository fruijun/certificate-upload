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

/*
 * @export getQueryString 获取url上的参数
 * @param {string} name
 * @returns
 */
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  // return unescape(r[2]);
  return '';
}

// 删除对象中没有值的属性  
export function checkObj(obj) {
  if (!(typeof obj == 'object')) {
    return;
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
}

export function getPlatform() {
  return '0'; // h5
}

export function getUUID() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  const uuid = s.join('');
  return uuid;
}
export function getDeviceType(){
  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
    return 'ios';
  } else if(/(Android)/i.test(navigator.userAgent)){
    return 'android';
  } else {
    return 'other';
  }
}