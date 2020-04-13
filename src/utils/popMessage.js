import Vue from 'vue';

const vm = new Vue();

export function popover(config, clickCallback) {
  const paramsType = Object.prototype.toString.call(config).slice(8, -1);
  const instanceConfig = {
    showTitle: true,
    title: '温馨提示',
    content: '',
    showCancelButton: false,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
  };
  if (paramsType === 'Object') {
    Object.assign(instanceConfig, config);
  } else {
    instanceConfig.content = config || '';
  }
  const instance = vm.$createPopover({
    ...instanceConfig,
    onClick: btnName => {
      if (clickCallback && typeof clickCallback === 'function') {
        clickCallback(btnName);
      }
      instance.remove();
    },
    onChange: value => {
      if (!value) {
        instance.remove();
      }
    },
  });
  instance.show();
}

export function toast(config) {
  const paramsType = Object.prototype.toString.call(config).slice(8, -1);
  const instanceConfig = {
    time: 3000,
    content: '',
    showMask: false,
  };
  if (paramsType === 'Object') {
    Object.assign(instanceConfig, config);
  } else {
    instanceConfig.content = config || '';
  }
  const instance = vm.$createBaseToast(instanceConfig);
  instance.show();
}

export function showMask() {
  const toast = vm.$createToast({
    txt: '',
    // mask: true,
    time: 120000,
  });
  toast.show();
}

export function hideMask() {
  const toast = vm.$createToast({
    txt: '',
    // mask: true,
    time: 120000,
  });
  toast.hide();
}
