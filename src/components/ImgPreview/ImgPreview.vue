<template>
  <div class="zoom-image-container mask" v-if="isVisable" :style="{ 'z-index':zIndex }" @click.stop.prevent="close">
    <div class="slider-wraper" @touchstart="startEvent">
        <div ref="bannerSlide" class="banner-slide">
            <div class=""></div>
        </div>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
        <span>{{ `${ currentIndex +1 }/ ${ totalLen }` }}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:'ImgPreview',
props:{
    zIndex:{
        type:Number,
        default:2000,
    },
    isVisable:{
        type:Boolean,
        default:false,
    },
    currentIndex:{
        type:Number,
        default:0,
    },
    //方向：horizontal,vertical
    direction:{
        type:String,
        default:'horizontal',
    },
    //初始化播放
    initPlay:{
        Type:Boolean,
        default:false,
    },
    //播放速度
    autoPlay:{
        type:Number,
        default:3000,
    },
    //分页器/数字指示器
    pagination:{
        type:Boolean,
        default:true,
    },
    //分页器类型bullets,number,
    paginationType:{
        type:String,
        default:'number'
    },
    //特效
    effect:{
        type:String,
        default:''
    }
},
methods:{
    //关闭预览
    close(){},
    startEvent(e){
        let slideContainer = this.$refs.slideContainer;
        
    },
},
}
</script>

<style lang="scss" scoped>
.mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background:rgba(0,0,0,.6);
}
.slider-wraper{
    position: relative;
    width: 100%;
    // height: 100%;
}
</style>