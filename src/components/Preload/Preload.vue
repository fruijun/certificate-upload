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
import 'yuki-createjs';
require('yuki-createjs/lib/preloadjs-0.6.2.combined');
require('yuki-createjs/lib/soundjs-0.6.2.combined');

import { getSign } from '@/utils/share';
import { popover } from '@/utils/popMessage';
export default {
    name:'preload',
    data(){
        return {
            mainfest:[
                {src:"https://alissl.youcash.com/cip/sit/recruitment-sit/music.mp3",id:'audio'},
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/public/loading_circle@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/public/logo@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/public/music@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p1/p1_bg2.jpg' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p1/p1_building2020@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p1/p1_entre@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p1/p1_manbuliding@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p1/p1_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p1/p1_title1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p2/p2_bg.jpg' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p2/p2_introd1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p2/p2_introd2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p2/p2_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p2/p2_tower@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/public/bg（p3-p9）.jpg' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_dai@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_gou@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_hua@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_qianbao@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_text@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p3/p3_title2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business3@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business4@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business5@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business6@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_business7@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p4/p4_web@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize3@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize4@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize5@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize6@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize7@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_prize8@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_title1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p5/p5_title2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_title1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_title2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_training1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_training2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_training3@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment3@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment4@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment5@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment6@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment7@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p6/p6_treatment8@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p7/p7_frame1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p7/p7_frame2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p7/p7_frame3@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p7/p7_frame4@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p7/p7_line@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p7/p7_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_line@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps1@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps2@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps3@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps4@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps5@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps6@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps7@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_steps8@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p8/p8_title@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p9/p9_adress@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p9/p9_code@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p9/p9_dot@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p9/p9_man@2x.png' },
                {src:'https://alissl.youcash.com/cip/sit/recruitment-sit/preload/p9/p9_title@2x.png' },
            ],
            showLoading:false,
            imgsSum:NaN,
            loadedCount:0,
            loading:null,
            loadedFlag:false,
            percent:0,
            barWidth:0,
            circleLeft:-5,
            shareData:{
                shareTitle: '中邮消费金融2020年社会招聘风险科技类专场招聘会',
                shareContent: 'OMG！投它！投它！！投它！！！',
                shareUrl: process.env.VUE_APP_SHARE_INDEXURL,
                imageArray: [process.env.VUE_APP_SHARE_IMGURL],
            },
        }
    },
    props:{
        zIndex:{
            type:[Number,String],
            default:2000,
        },
    },
    mounted(){
        // const cjs = createjs;
        // this.statge = new cjs.Stage(this.$el.firstChild);
        // cjs.Ticker.addEventListener('tick',this.stage);
        this.show();
        this.preload();
    },
    methods:{
        preload(){
            // const audio = document.getElementById('audio');

            const preload = new createjs.LoadQueue(true);
            //为preloaded添加整个队列变化时展示的进度事件
            // preload.addEventListener("progress", this.handleFileProgress);
            preload.on('progress', this.handleFileProgress, this);

            //注意加载音频文件需要调用如下代码行
            preload.installPlugin(createjs.SOUND);
            // preload.installPlugin(createjs.Sound);
            //为preloaded添加当队列完成全部加载后触发事件
            // preload.addEventListener("complete", this.loadComplete);
            
            preload.on('complete', this.loadComplete, this);
            preload.on("error", this.handleError, this);
            //设置最大并发连接数  最大值为10
            preload.setMaxConnections(1);
            preload.loadManifest(this.mainfest);
        },
        handleError(e){
            console.log('error',e)
        },
        handleFileProgress(event){
            this.loadedCount++;
            console.log(Math.ceil(event.loaded * 100) + "%");


            const scale = document.documentElement.clientWidth / 375 ;
            // console.log('scale',document.documentElement.clientWidth,scale)
            const baseSize = 247 * Math.ceil(event.loaded * 100) / 100;
            this.barWidth =  baseSize * scale;
            // console.log('width2',baseSize,scale,baseSize * scale);
            this.circleLeft = `${Math.ceil(event.loaded * 100) -5}%`;
            console.log('media');
            try{
            const media = document.getElementById('audio');
            console.log('media2');
            // media.addEventListener("canplay",this.handleCanPlay);
            }catch(e){
                console.log('try ',e)
            }

            if(this.loadedCount >= this.mainfest.length){
                console.log('全部预加载完')
                this.handleLoaded();
            }
        },
        async handleCanPlay(){
            console.log('canPlay')
        //     const media = document.getElementById('audio');
        //   media.play();
            // await this.getWXSign();
        },
        handleLoaded(){
            console.log('预加载handleLoaded')
            if(!this.loadedFlag){
                console.log('handleLoaded')
                //关闭加载动画
                this.loadedFlag = true;
                setTimeout(() => {
                    //  this.hide();
                    //  this.$emit('loaded');
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
        loadComplete(){
            console.log('wan1')
        },
        async getWXSign(){
            console.log('getSign');
            //微信分享签名
            await getSign({
              errHandler: () => {
                popover({
                  content: '微信签名失败，无法分享',
                  showCancelButton: false,
                  confirmButtonText: '我知道了',
                });
              },
            },this.shareData);
        },
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