<template>
  <div class="banner-wrap" v-show="showBanner">
    <div class="banner-img-wrap" @touchstart="startEvent" @touchmove="moveEvent" @touchend="endEvent">
      <div ref="bannerSlide" class="banner-slide">
        <div ref="slideContainer" class="slides-container" :class="moveDirection ? 'slide-'+moveDirection : '' " :style="{width:`${slideContainerWidth}`}">
          <slot>
          </slot>
        </div>
      </div>
    </div>
    <!-- 导航小圆点 -->
    <div class="banner-dot-wrap" v-if="showDots">
      <slot name="dots" :current="currentIndex" :dots="dots">
        <span :class="{active: currentIndex === index}" v-for="(item, index) in dots" :key="index"></span>
      </slot>
    </div>
  </div>
</template>

<script type="es6">
export default {
  name: 'Swiper',
  data() {
    return {
      showBanner: true,
      contentList: [],
      currentIndex: 0,
    //   slideContainerWidth: '100%',
      slideItemWidth: '100%',
      timer: null,
      timerTime: 1000,
      canSlide: true, // 是否可以手动滑动
      dots: [],
    };
  },
  mounted() {
      console.log('mounted')
    this.timerTime = parseInt(this.intervalTime);
    this.initData();
  },
  created(){
      const vm = this;
      vm.$nextTick(() => {
          vm.initData();
      })
    // this.initData();
  },
  props: {
    content: {
      type: Array,
      // required: true,
      default: function() {
        return [];
      },
    },
    // 是否支持手滑
    isMoveSlide: {
      type: Boolean,
      default: true,
    },
    // 是否显示下方的点
    showDots: {
      type: Boolean,
      default: true,
    },
    //过渡时间
    transitionTime: {
      type: [String, Number],
      default: 500,
    },
    //每一帧的停留时间
    intervalTime: {
      type: [String, Number],
      default: 3000,
    },
  },
  computed: {
    moveDirection() {
      if (this.type === 'fade') {
        return '';
      }
      let direction = this.slideDirection;
      if (direction === 'right' || direction === 'up' || direction === 'down') {
        return direction;
      } else {
        return 'left';
      }
    },
    slideContainerWidth(){
        return `${this.$refs.bannerSlide.clientWidth * this.contentList.length}px`;
    },
  },
  methods: {
    initData() {
      const slides = document.querySelector('.slides-container').getElementsByClassName('slide');
      const len = slides.length;
      this.dots = new Array(len);
      this.contentList = new Array(len);
    //   this.initSlide();
    },
    initSlide() {
      if (this.contentList.length < 0 && this.type === 'slide') {
          console.log('111')
        return;
      }
      //获取滚动项目容器
      let slideContainer = this.$refs.slideContainer;
      // 水平滚动需要给每一项赋值宽度
      // if (this.moveDirection === 'left' || this.moveDirection === 'right') {
      let slideArea = this.$refs.bannerSlide;
      let itemWidth = slideArea.clientWidth;
      if (slideArea.clientWidth) {
        this.slideItemWidth = `${itemWidth}px`;
        this.slideContainerWidth = `${itemWidth * this.contentList.length}px`;
      }
      // }//
    },
    //滑动滚动
    slidePlay() {
      let slideContainer = this.$refs.slideContainer;
      if (this.currentIndex >= this.contentList.length) {
        this.currentIndex = this.contentList.length - 1;
        return;
      } else if (this.currentIndex < 0) {
        this.current = 0;
        return;
      } else {
        slideContainer.style.webkitTransition = `${parseInt(this.transitionTime) / 1000}s`;
        slideContainer.style.transition = `${parseInt(this.transitionTime) / 1000}s`;
      }

      let distance = 0;
      distance = parseFloat(this.slideItemWidth) * this.currentIndex;
      slideContainer.style.webkitTransform = `translate(-${distance}px,0)`;
      slideContainer.style.transform = `translate(-${distance}px,0)`;
    },
    startEvent(e) {
      this.clearTime();
      this.startPoint = [e.touches[0].clientX, e.touches[0].clientY];
      let slideContainer = this.$refs.slideContainer;
      slideContainer.style.webkitTransition = '0s';
      slideContainer.style.transition = '0s';
    },
    moveEvent(e) {
      this.clearTime();
      const slideContainer = this.$refs.slideContainer;
      const len = e.touches[0].clientX - this.startPoint[0];
      const moveLen = -this.$refs.bannerSlide.clientWidth * this.currentIndex + len;
      // console.log(moveLen, len / this.$refs.bannerSlide.clientWidth, len);
      if (
        !(len > 0 && this.currentIndex === 0) &&
        !(len < 0 && this.currentIndex === this.contentList.length - 1)
      ) {
        slideContainer.style.webkitTransform = `translate(${moveLen}px, 0)`;
        slideContainer.style.transform = `translate(${moveLen}px, 0)`;
      }
    },
    endEvent(e) {
      clearInterval(this.timer);
      let slideContainer = this.$refs.slideContainer;
      if (this.moveDirection === 'left') {
        const len = e.changedTouches[0].clientX - this.startPoint[0];
        if (
          !(len > 0 && this.currentIndex === 0) &&
          !(len < 0 && this.currentIndex === this.contentList.length - 1)
        ) {
          if (len > 0 && len > this.$refs.bannerSlide.clientWidth * 0.2) {
            this.currentIndex--;
          } else if (len < 0 && len < -this.$refs.bannerSlide.clientWidth * 0.2) {
            this.currentIndex++;
          }
          this.slidePlay();
        }
      }
    },
    prevSlide() {
      this.currentIndex--;
      this.slidePlay();
    },
    nextSlide() {
      this.currentIndex++;
      this.slidePlay();
    },
    slideTo(index) {
      this.currentIndex = index;
      this.slidePlay();
    },
    clearTime() {
      if (!!this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  watch: {
    currentIndex(value) {
      if (this.type === 'slide' && this.contentList.length > 2) {
        if (value >= this.contentList.length - 1) {
          this.timerTime = parseInt(this.intervalTime);
        } else if (value === 0) {
          this.timerTime = parseInt(this.transitionTime);
        } else {
          this.timerTime = parseInt(this.intervalTime) + parseInt(this.transitionTime);
        }
      }
    },
    content: {
      handler: function(value) {
          console.log('content')
        this.initData();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
  img {
    display: block;
  }
}
.banner-close {
  position: absolute;
  top: 20px;
  right: 28px;
  z-index: 100;
  background: url('../../assets/img/close.png') no-repeat center;
  background-size: 100%;
}
.banner-img-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

//fade
.banner-fade {
  width: 100%;
  height: 100%;
  position: relative;
  .banner-fade-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    &.show {
      z-index: 10;
      -webkit-animation: show linear 0.5s;
      animation: show linear 0.5s;
    }
    &.hide {
      z-index: 0;
      -webkit-animation: hide linear 0.5s;
      animation: hide linear 0.5s;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}

@-webkit-keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-webkit-keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

//slide
.banner-slide {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.slides-container {
  &.slide-left,
  &.slide-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    &:after {
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
      content: '';
      clear: both;
    }
  }
  &.slide-left {
    .banner-slide-img {
      float: left;
    }
  }
  &.slide-right {
    .banner-slide-img {
      float: right;
    }
  }
  &.slide-up,
  &.slide-down {
    width: 100%;
    height: auto;
    .banner-slide-img {
      width: 100%;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

// dots
.banner-dot-wrap {
  position: absolute;
  bottom: 2px;
  right: 0;
  left: 0;
  padding: 0 6px;
  font-size: 0;
  text-align: center;
  transform: translateZ(1px);
  > span {
    margin: 0 13px 20px 13px;
    border: solid 1px #a6a6a6; /*no*/
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #ffffff;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: bottom;
  }
  .active {
    background: #abccfa;
    width: 40px;
    border: none;
  }
}
</style>
