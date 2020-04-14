<template>
    <div class="group-pic">
        <div class="added_upload_imgBox">
            <div class="upload_box add_upload_imgDiv" v-for="(item,index) in imgs" :key="index">
                <img class="img" :src="item.src" id="item" @click="handleView(index)"/>
                <!-- <p class="add_upload_close" > -->
                <img class="add_upload_close" src="../../assets/img/close.png" @click="handleDelete(index)"/>
                <!-- </p> -->
            </div>
            <input type="file" capture="camera" accept="image/*" ref="input" style="display: none">


            <div v-if="canUpload" class="upload_box add_upload">
                <button @click="takePhotoApp" class="add_upload_button">
                    <img class="add_upload_icon" src="../../assets/img/upload_red.png"/>
                    <span v-if="hasPicture">{{ count }}/{{ total }}</span>
                    <span v-else>上传凭证</span>
                </button>
            </div>
        </div>
        <!-- 图片预览 -->
        <!-- <li class="house-pic-item" v-for="(picItem, picIndex) in item.imgUrl" :key="picIndex">
            <img :src="picItem" alt="" :key="picItem" width="120" height="90" :ref="'showImg_'+index">
            <div class="mask">
                <div class="ico-box">
                    <span class="font-btn" @click="clickWatchImg('showImg_'+index,picIndex)">
                        <i class="iconfont icon-fangda"></i>
                    </span>
                    <span class="font-btn" v-if="!(!item.isNew&&editBtnType[index])" @click="delHouseImage(index,picIndex)">
                        <i class="iconfont icon-shanchu"></i>
                        <i class="line"></i>
                    </span>
                </div>
            </div>
        </li> -->
        <!-- 图片预览 -->
        <!-- <Swiper ref="swiper" :showBanner="showPreview">
            <img class="slide" v-for="(item,indexImg) in imgs" :src="item.src" alt="" :key="indexImg" width="120" height="90" :ref="'showImg_'+indexImg">
        </Swiper> -->
        <!-- 图片预览 -->
        <div class="largen" v-show="showLargen" @click="hide">
          <!-- <img class="close" src="../../assets/img/close.png" @click="closeLargen" /> -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-show="true" v-for="(item,idx) in imgs" :key="idx">
              <!-- <img :src="'data:image/png;base64,'+item" alt /> -->
              <img :src="item.src" alt />
            </swiper-slide>
          </swiper>
          <div class="order-number" v-show="imgs.length > 1">{{activeIndex}}/{{imgs.length}}</div>
        </div>
    </div>
</template>
<script>
// import Swiper from '@/components/Swiper/Swiper';
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
    name:'takePicture',
    components:{
    //    Swiper, 
        swiper,
        swiperSlide,
    },
    props:{
        // imgs:{
        //     type:Array,
        //     default:() => []
        // }
        // hasPicture:{
        //     type:Boolean,
        //     default:false,
        // }
        //this.$previewRefresh()
    },
    data(){
        return {
            count:0,
            total:10,
            imgs:[],
            showPreview:false,
            showLargen:false,
            swiperOption: {
                pagination: {
                  el: ".swiper-pagination"
                }
            },
            activeIndex:1,
        }
    },
    watch:{
        showLargen(val) {
            if (val) this.updateSlideOrder();
        }
    },
    computed:{
        canUpload(){
            return this.count < this.total;
        },
        hasPicture(){
            return this.imgs.length > 0;
        },
        swiper(){
            return this.$refs.mySwiper.swiper;
        },
    },
    mounted(){
        this.$refs.input.addEventListener('change',async () => {
            if(event.target.files.length >0){
                const file = event.target.files[0];
                // console.log('length',event.target.files.length)//始终是1
                // console.log('files',file)
                let num = this.imgs.length;
                // console.log('num',num)
                this.imgs.push({src:'',height:0});
                const fr = new FileReader(file);
                // console.log('fr',fr)
                fr.readAsDataURL(file);
                fr.onload = () => {
                    this.imgs[num++].src = fr.result;
                    this.count++;
                    const that = this;
                    let image = new Image();
                    // console.log('num',num)
                    image.src = fr.result;
                    image.onload = () => {
                        let width = image.width;
                        let height = image.height;
                        // console.log('wid h',width,height)
                        // console.log('num2',num,that.imgs,that.imgs[num],that.imgs[num-1])
                        that.imgs[num-1].height = height;
                        num++;
                        // console.log(that.imgs[num-1].height)
                    }

                }

            }
        });
    },
    methods:{
        handleDelete(index){
            this.imgs.splice(index,1);
            this.count--;
        },
        handleView(index){
            this.showLargen = true;
            // console.log('index',index+1);
            this.swiper.activeIndex = index +1;
        },
        updateSlideOrder() {
          const thisSelf = this;
          this.swiper.on("slideChange", val => {
            thisSelf.activeIndex = this.swiper.activeIndex + 1;
          });
        },
        hide(){
            this.showLargen = false;
        },
        takePhotoApp(){
            this.takePhotoFile();
        },
        // 文件上传方式拍照
        takePhotoFile() {//
          this.$refs.input.click();
          console.log(this.$refs.input.value)
        },
    },
}
</script>
<style lang='scss' scoped>
.group-pic {
    margin-top: 100px;
}
.upload_box{
    position: relative;
    float: left;
    width: 80px;
    height: 80px;
    margin: 0 10px 10px 0;
}
.add_upload .add_upload_button{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1Px dashed gray;
}
.add_upload_imgDiv {
    position: relative;
    width: 80px;
    height: 80px;
    img{
        width: 100%;
        height: 100%;
    }
    img.add_upload_close{
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
    }
}


.gallery-window-map{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 10px;
}
.house-pic-item {
    position: relative;
    display: inline-block;
    margin-right: 13px;
    width: 120px;
    height: 90px;
    background-color: #e3e3e3;
}
.pic-box {
    width: 100%;
    text-align: center;
}
.icon-zengjia {
    position: relative;
    top: 12px;
    font-size: 26px;
    color: #b2b2b2;
}
.btn-tit {
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    color: #999;
}
.mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(34, 34, 34, 0.6);
}
.font-btn {
    display: inline-block;
    height: 40px;
    width: 50%;
    padding: 0 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.font-btn:last-child {
    position: relative;
}
.icon-fangda,
.icon-shanchu {
    font-size: 22px;
    color: #fff;
}
.line {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 10px;
    width: 1px;
    height: 20px;
    background: #fff;
}
.largen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
.order-number {
  color: #fff;
  position: absolute;
  bottom: 20px;
}
</style>