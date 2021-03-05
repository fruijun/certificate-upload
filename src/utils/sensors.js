// import sa from 'sa-sdk-javascript';
import { setRequestProps } from '@/api';
import { getVector, getPlatform } from './common';
import { checkObj } from '@/utils/common';
import store from '@/store';

const switchKey = {
  // 是否开启全埋点
  isAutoTrack: false,
  // 是否开启自埋点
  isTrack: false,
};

const sensors = {
  refer_title: '', // 上一个页面title
  isAutoTrack: switchKey.isAutoTrack,
  isTrack: switchKey.isTrack,
  init: () => {
    try {
      sa.logout();
      // 设置公共属性
      sa.registerPage({
        vector: '0',
        platform_type: '0',
      });
      switchKey.isAutoTrack = true;
      sa.quick('autoTrack');
      switchKey.isTrack = true;
    } catch (err) {
      console.error('sensors set init error: ', err);
    }
  },
  setProps: params => {
    try {
      if (params) {
        if (switchKey.isAutoTrack || switchKey.isTrack) {
          sa.registerPage(params);
        }
      }
    } catch (err) {
      console.log('sensors setProps error: ', err);
    }
  },
  login: userId => {
    try {
      if (switchKey.isAutoTrack || switchKey.isTrack) {
        sa.login(userId);
      }
    } catch (err) {
      console.log('sensors login error: ', err);
    }
  },
  track: (name, params, callback) => {
    try {
      // 为所有的自埋点事件加上$url
      const trackParams = {
        ...checkObj(params),
        $url: window.location.href,
      };
      if (callback && typeof callback === 'function') {
        let hasCalled = false;
        setTimeout(sensorsCallBack, 400); // 如果没有回调成功，设置超时回调
        function sensorsCallBack() {
          if (!hasCalled) {
            hasCalled = true;
            callback();
          }
        }
        if (switchKey.isTrack) {
          sa.track(name, trackParams, sensorsCallBack); // 把回调操作加在callback里
        }
      } else {
        if (switchKey.isTrack) {
          sa.track(name, trackParams);
        }
      }
    } catch (err) {
      console.log('sensors track error: ', err);
    }
  },
  trackAsAutoTrack: (name, params, callback) => {
    try {
      // 为所有的模拟全埋点事件加上$url
      const trackParams = {
        ...params,
        $url: window.location.href,
      };
      if (callback && typeof callback === 'function') {
        let hasCalled = false;
        setTimeout(sensorsCallBack, 400); // 如果没有回调成功，设置超时回调
        function sensorsCallBack() {
          if (!hasCalled) {
            hasCalled = true;
            callback();
          }
        }
        if (switchKey.isAutoTrack) {
          sa.track(name, trackParams, sensorsCallBack); // 把回调操作加在callback里
        }
      } else {
        if (switchKey.isAutoTrack) {
          sa.track(name, trackParams);
        }
      }
    } catch (err) {
      console.log('sensors trackAsAutoTrack error: ', err);
    }
  },
  setUserProp: (props, callback) => {
    try {
      if (switchKey.isAutoTrack || switchKey.isTrack) {
        sa.setProfile(props, callback);
      }
    } catch (err) {
      console.log('sensors setUserProp error: ', err);
    }
  },
  quick: (name, obj) => {
    try {
      if (switchKey.isAutoTrack) {
        sa.quick(name, obj);
      }
    } catch (err) {
      console.log('sensors quick error: ', err);
    }
  },
  getDistID: () => {
    try {
      if (switchKey.isAutoTrack || switchKey.isTrack) {
        return sa.store.getDistinctId();
      }
      return '';
    } catch (err) {
      console.log('sensors getDistID error: ', err);
      return '';
    }
  },
};

export default sensors;