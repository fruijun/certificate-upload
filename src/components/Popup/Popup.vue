<template>
  <div class="popup" :style={zIndex:zIndex} v-show="showPopup">
    <div class="popup-modal" v-show="showMask" @click="clickMask"></div>
    <slot name="popupContent">
      <div class="popup-container-wrap">
        <slot></slot>
      </div>
    </slot>
  </div>
</template>

<script type="es6">
export default {
  name: 'Popup',
  data() {
    return {
      showPopup: false,
    };
  },
  props: {
    zIndex: {
      type: [String, Number],
      default: 1000,
    },
    showMask: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    clickMask(e) {
      this.$emit('EVENT_MASK_CLICK');
    },
    show() {
      this.showPopup = true;
    },
    hide() {
      this.showPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  // -webkit-transform: translate(100%, 100%);
  // transform: translate(100%, 100%);
  text-align: center;
}
.popup-modal {
  position: absolute;
  width: 100%;
  height: 100%;
  // left: -100%;
  // top: -100%;
  background: rgba(0, 0, 0, 0.6);
}
.popup-container-wrap {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
