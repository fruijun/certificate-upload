<template>
  <transition name="base-toast-fade">
    <Popup :showMask="showMask" :zIndex="zIndex" v-show="showToast">
      <div class="toast-content">
        <div class="toast-word">
          <p>{{content}}</p>
        </div>
      </div>
    </Popup>
  </transition>
</template>

<script type="es6">
import Popup from '@/components/Popup/Popup';

export default {
  name: 'BaseToast',
  data() {
    return {
      showToast: false,
      timeout: null,
    };
  },
  computed: {
    delayTime: () => {
      console.log('com this.time',this.time)
      console.log('this.time',this.time)
      if (this.time) {
        const time = window.parseInt(this.time);
        return time;
      } else {
        return 3000;
      }
    },
  },
  props: {
    // 提示框内容
    content: {
      type: String,
      required: true,
      default: '',
    },
    // 显示的持续时间
    time: {
      type: [Number, String],
      default: 3000,
    },
    // 是否显示朦层
    showMask: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: [String, Number],
      default: 900,
    },
    // 是否可控制关闭(false为自动倒数关闭)
    controlable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Popup,
  },
  mounted() {
    if (!this.controlable) {
      this.closeTimeout();
    }
  },
  methods: {
    closeTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.$nextTick(() => {
        this.timeout = setTimeout(() => {
          this.hide();
          clearTimeout(this.timeout);
        }, this.time);
      });
    },
    show() {
      this.showToast = true;
    },
    hide() {
      this.showToast = false;
    },
  },
  watch: {
    showToast(value) {
      if (value && !this.controlable) {
        this.closeTimeout();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-content {
  font-size: 14px;
  padding: 14px 21px;
  max-width: 250px;
  min-width: 200px;
  min-height: 50px;
  max-height: 75px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  .toast-word {
    max-height: 50px;
    overflow: hidden;
  }
  p {
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    white-space: normal;
    word-wrap: break-word;
  }
}

.base-toast-fade-enter-active {
  animation: toast-in 0.2s;
}

.base-toast-fade-leave-active {
  animation: toast-out 0.2s;
}

@-webkit-keyframes toast-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes toast-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes toast-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes toast-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
