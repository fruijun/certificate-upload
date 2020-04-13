<template>
<div>
    <div v-show="showLoading" :zIndex="zIndex" class="container">
        <div class="bar-container">
            <div id="bar" class="loading-bar" :style="{ width:`${barWidth}px`}">
            <img src="../../assets/public/loading_circle@2x.png" :style="{ left:`${circleLeft}`}"/>    
            </div>
        </div>

        <div class="txt">加载中...</div>
    </div>
</div>
</template>

<script type="es6">
    export default {
        name:"PreloadImage",
        data(){
            return {
                showLoading:false,
                imgsSum:NaN,
                loadedCount:0,
                loading:null,
                loadedFlag:false,
                percent:0,
                barWidth:0,
                circleLeft:-5,
            }
        },
        props:{
            order:{
                type:Boolean,
                default:false,
            },
            urlList:{
                type:Array,
                require:true,
                default:function(){
                    return [];
                }
            },
            zIndex:{
                type:[Number,String],
                default:2000,
            },
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                //根据传入的参数初始化
                this.imgsSum = this.urlList.length;
                if(this.imgsSum >0 ){
                    //显示加载动画
                    // this.loading = this.$createLoading();
                    // this.loading.show();
                    this.show();
                    this.order ? this.orderPreload():this.unorderPreload();
                }
                //设置延时触发loaded事件，避免图片加载异常无法触发
                setTimeout(() => {
                    this.handleLoaded();
                },20000);
            },
            //无序加载，并发下载图片
            unorderPreload(){
                this.urlList.forEach((imgUrl,i) => {
                    const oImg = new Image();
                    oImg.addEventListener('load',this.imgLoaded);
                    oImg.addEventListener('error',this.imgLoaded);
                    oImg.src = imgUrl;
                })
            },
            //有序加载图片，一次只有一张图片在加载
            orderPreload(){
                const oImg = new Image();
                oImg.addEventListener('load',this.imgLoaded);
                oImg.addEventListener('error',this.imgLoaded);
                oImg.src = this.urlList[this.loadedCount];
            },
            imgLoaded(){
                this.loadedCount++;
                // console.log('单张图片加载完成');
                let percentNum = Math.floor(this.loadedCount / this.imgsSum * 100);
                this.percent = `${percentNum}%`;
                const scale = document.documentElement.clientWidth / 375 ;
                // console.log('scale',document.documentElement.clientWidth,scale)
                const baseSize = 247 * parseFloat(this.percent) / 100;
                this.barWidth =  baseSize * scale;
                // console.log('width2',baseSize,scale,baseSize * scale);
                this.circleLeft = `${percentNum -5}%`;
                if(this.loadedCount >= this.imgsSum){
                    console.log('全部图片加载完')
                    this.handleLoaded();
                }
            },
            handleLoaded(){
                    console.log('=======handleLoaded')

                if(!this.loadedFlag){
                    console.log('handleLoaded')
                    //关闭加载动画
                    this.loadedFlag = true;
                    setTimeout(() => {
                         this.hide();
                         this.$emit('loaded');
                    },500);
                    // this.hide();
                    // this.$emit('loaded');
                }
            },
            show(){
                this.showLoading = true;
            },
            hide(){
                this.showLoading = false;
            },
        },
        watch:{
        },
    }
</script>
<style lang="scss" scoped>
$transitionTime:.5s;
.container{
    width: 265px;
    height:30.05px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.bar-container{
    width: 265px;
    height: 15.5px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border:1px solid #6B8DFDFF;
    border-radius: 7.5px;
    background-color: #3135D8FF;
}
.loading-bar{
    width: 247px;
    height: 5px;
    border-radius: 2.5px;
    margin-left: 9px;
    margin-top: 5px;
    margin-bottom: 5px;
    background:linear-gradient(to right,#f9c013FF,#f97e41FF);
    transition: width $transitionTime linear;
}
img{
    height:30.05px;
    width: 30.05px;
    position: absolute;
    top: -50%;
    transition: left $transitionTime linear;
}
.txt {
    font-size: 13px;
    margin-top: 38.5px;
    color: #84BCFBFF;
}
</style>
