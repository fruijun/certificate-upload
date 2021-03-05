<template>
<div>
    <div class="outer-wrapper" id="outer">
        <div class="header">
            <div class="title-bar">
                <img src="../../assets/img/nav_back_white@2x.png" @click="goBack()"/>
                <span>贷款用途凭证</span>
            </div>
            <!-- 贷款信息 -->
            <LoanInfo :loanInfo="loanInfo"></LoanInfo>
        </div>
        <!-- 凭证信息 -->
        <div class="wraper">
            <div class="default-container">
                <Title title="凭证信息"></Title>
                <p class="credentials-title">
                    {{ credentialsTips }}
                </p>
                <div class="box">
                    <div class="upload_box add_upload_imgDiv" v-for="(item,index) in imgs" :key="index">
                        <div class="itemImg" :id="`${'bgImg'+index }`" @click="handleView(index)"/>
                        <img v-if="canEdit" class="add_upload_close" src="../../assets/img/list_delete_normal@2x.png" @click="handleDelete(index)"/>
                    </div>

                    <input type="file" capture="camera" accept="image/*" ref="input" style="display: none">

                    <div v-if="canUpload" class="upload_box add_upload">
                        <button @click="takePhotoApp" class="add_upload_button">
                            <img class="add_upload_icon" src="../../assets/img/app_picture@2x.png"/>
                            <span v-if="hasPicture">{{ count }}/{{ total }}</span>
                            <span v-else>上传凭证</span>
                        </button>
                    </div>
                </div>
                <textarea v-show="showTxtArea()" ref="textarea" :style="{'height':txtHeight}" class="instructions input-hook" id="instructions" type="text" placeholder="对凭证进行补充说明（100字以内）" v-model="txtValue" maxlength="100" :readonly="!canEdit"/>
            </div>
            <!-- 操作记录 -->
            <operateLog v-if="showLog()" :credentialsInfo="credentialsInfo"></operateLog>
            <div class="btn">
                <button :disabled="disabled" @click="handleClick" :class="disabled ?'disabled':'abled'">
                    <span>{{ btnTxt }}</span>
                </button>
            </div>
        </div>
    </div>
            <!-- 图片预览 -->
        <div class="largen" v-show="showLargen" @click="hide">
          <swiper :options="swiperOption" ref="mySwiper" style="margin-top: auto;margin-bottom: auto;">
            <swiper-slide v-show="true" v-for="(item,idx) in imgs" :key="idx">
                  <div class="large-view" :id="`${'largView'+idx}`">
                    <div class="swiper-zoom-container">
                    <img :src="item.internetUrl" alt :id="`${'largImg'+idx}`"/>
                     </div>
                  </div>       
            </swiper-slide>
          </swiper>
        </div>
    <Loading v-show="$store.state.btnLoading" :tips="`数据加载中`"></Loading>
    <Loading v-show="loadingImg" :tips="`上传中`"></Loading>
</div>
</template>
<script type="es6">
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Title from '@/components/Title/Title';
import OperateLog from '@/components/OperateLog/OperateLog';
import LoanInfo from '@/components/LoanInfo/LoanInfo';
import Loading from '@/components/Loading/Loading';
import { popover,toast } from '@/utils/popMessage';
import { getDeviceType } from '@/utils/common';
import { getMultiImages,getLoanAccountInfo,closeWebView,getCipToken } from '@/utils/jsbridge';
import { queryLoanAccountUsageInfo,uploadLoanUsages,uploadPicture,getAntiRepeatToken } from '@/api/index';
import { formatString } from '@/utils/filter';
import calcTextareaHeight from '@/utils/calcTextareaHeight';
import sensors from '@/utils/sensors';

const btnNameConf = {
    need_upload:{
        btnName:'提交',
        credentialsTips:'请上传与贷款信息相符的贷款用途凭证',
    },
    no_need_upload:{
        btnName:'提交',
        credentialsTips:'不需要上传的账号',
    },
    uploaded:{
        btnName:'我知道了',
        credentialsTips:'已提交贷款用途凭证，感谢您的支持',
    },
    uploaded_need_reupload:{
        btnName:'重新提交',
        credentialsTips:'请检查并重新上传贷款用途凭证',
    }
}
export default {
    name:'takePicture',
    components:{
        swiper,
        swiperSlide,
        Title,
        OperateLog,
        LoanInfo,
        Loading,
    },
    inject:["reload"],
    props:{
    },
    data(){
        return {
            cipToken:'',
            total:10,
            imgs:[],
            showPreview:false,
            showLargen:false,
            swiperOption: {
                pagination: {
                  el: ".swiper-pagination"
                },
                autoHeight:true,
                width:window.innerWidth,
                zoom:true,
            },
            txtValue:'',
            activeIndex:1,
            credentialsTips:'',//凭证信息提示语
            btnTxt:'',
            uploadPicArr:[],
            loanInfo:{},
            credentialsInfo:{},
            loanAccount:'',
            txtHeight:'',
            referTitle:'',
            loadingImg:false,
            fromGrImg:[],//从相册拿回来的图片
        }
    },
    watch:{
        showLargen(val) {
            if (val) this.updateSlideOrder();
        },
        txtValue(val){
            if(val){
                this.getTxtHeight(val);
            }
            this.getTxtHeight(val);
        },
    },
    computed:{
        canUpload(){
            return this.$store.state.status !== 'uploaded' && this.count < this.total;
        },
        hasPicture(){
            if(this.imgs){
                return this.imgs.length > 0;
            }
            return false;
        },
        swiper(){
            return this.$refs.mySwiper.swiper;
        },
        disabled(){
            return this.$store.state.status !== 'uploaded' && this.imgs.length === 0;
        },
        canEdit(){
            return this.$store.state.status !== 'uploaded';
        },
        count(){
            return this.imgs.length;
        }
    },
    async mounted(){
        await this.init();
        this.fixScroll();
    },
    methods:{
        fixScrollTP() {
          let u = navigator.userAgent;
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if (isiOS) {
            window.scrollTo(0, 0);
          }
        },
        fixScroll(){
            if(getDeviceType() === 'ios'){
                document.body.addEventListener('focusout', () => { //软键盘关闭事件
                console.log('键盘关起');
                const likeArray = document.getElementsByClassName('input-hook');
                Array.from(likeArray, input => input.blur());
                window.scrollTo(0, 0);
            })
            }
        },
        async init(){
            await this.getLoanAccountInfo();
        },
        showTxtArea(){
            if(this.$store.state.status === 'uploaded'){
                return this.txtValue;
            } else {
                return this.imgs.length >= 1;
            }     
        },
        async getCipToken(){
            try{
            await getCipToken({},res => {
                const getData = JSON.parse(res);
                if(getData.code === '00'){
                    this.cipToken = getData.cipToken;
                    this.uploadLoanUsages(getData.cipToken);
                }
            });
            }catch(e){
                console.log('cipToken e',e)
            }
        },
        async queryLoanAccountUsageInfo(){
            const res = await queryLoanAccountUsageInfo({ loanAccount:this.loanAccount});
            // const res = await queryLoanAccountUsageInfo({ loanAccount:'70100030002245143'});
            if(res.respCode === '200100'){
                this.state = res.data.state;
                this.$store.commit('UPDATE_STATUS',res.data.state);
                this.$store.commit('UPDATE_CREDENTIALSINFO',res.data);
                const state = this.getPageStatusTxt();
                sensors.track('page_loanuse_credentials', {
                  title: document.title, 
                  refer_title: this.referTitle,
                  page_status:state
                });
            this.$nextTick(() => {
                this.btnTxt = btnNameConf[this.state].btnName;
                this.credentialsTips = btnNameConf[this.state].credentialsTips;
                console.log(btnNameConf[this.state].btnName,btnNameConf[this.state].credentialsTips);
                this.credentialsInfo = res.data;
                this.txtValue = res.data.remark;
                if(this.credentialsInfo.picArr){
                  this.imgs = JSON.parse(JSON.stringify(this.credentialsInfo.picArr));
                  setTimeout(()=> {
                      this.setBgImg(0,this.credentialsInfo.picArr,'init');
                  },1500)
                  this.uploadPicArr = JSON.parse(JSON.stringify(this.credentialsInfo.picArr));
                  console.log(this.imgs[0])
                }
            });
            this.setBgImg(0,this.credentialsInfo.picArr,'init');
              return res.data.state;
            }
        },
        getLoanAccountInfo(){
            getLoanAccountInfo({},res => {
            try{
                const getData = JSON.parse(res);
                if(getData.code == '00'){
                    const loanInfo = Object.assign({},{
                      account:getData.txnAcct,
                      amount:getData.advAmt,
                      time:getData.txnDate,
                      use:getData.loanPurposeName
                    });
                    this.referTitle = getData.referTitle;
                    this.loanInfo = this.formatLoanInfo(loanInfo);
                    this.loanAccount = getData.txnAcct;
                    this.queryLoanAccountUsageInfo();
                }
            }catch(e){
                console.log('getLoanAccountInfo e',e)
            }
            });
        },
        formatLoanInfo(info){
            const account = formatString(info.account,'caseNo');
            const time = formatString(info.time,'dateFormat');
            const amount = formatString(info.amount,'currency');
            const use = info.use;
            return {
                account:account,
                time:time,
                amount:amount,
                use:use
            }
        },
        showLog(){
            return this.$store.state.status === 'uploaded' || this.$store.state.status === 'uploaded_need_reupload';
        },
        need_upload(){
            return this.$store.state.status === 'need_upload' || this.$store.state.status === 'uploaded_need_reupload';
        },
        async handleClick(){
            const state = this.$store.state.status;
            if(state === 'need_upload' || state === 'uploaded_need_reupload'){
                let txtLen = 0;
                if(this.txtValue){
                    txtLen = this.txtValue.length;
                }
                sensors.track('loancredentials_submit',{
                    btn_name:this.btnTxt,
                    photo_num:this.imgs.length,
                    text_num:txtLen
                })
            } else {
                sensors.track('loancredentials_submit',{
                    btn_name:this.btnTxt,
                })
            }
            if(this.need_upload()){
                const num = this.imgs.length;
                popover(
                  {
                    content: `您上传了${ num }张图片，确定提交作为贷款用途凭证吗？`,
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                  },
                  btnName => {
                    let btnTxt = '取消';
                    if (btnName === 'confirm') {
                        this.getCipToken();
                        btnTxt = '确定';
                    }
                    if(this.$store.state.status === 'need_upload'){
                        sensors.track('submit_floatwindow_btnclick',{
                            btn_name:btnTxt
                        })
                    }
                  },
                );
            } else if(this.$store.state.status === 'uploaded'){
                this.goBack();
            }
        },
        async uploadLoanUsages(token){
            const uploadPicArr = this.uploadPicArr;
            let options = {
                header:{
                    cipToken:token,
                },
                showLoading:true,
                errHandler:() => {
                    toast({content:'提交失败',time:'3000',showMask: false,})
                } 
            }
            const res = await uploadLoanUsages({
                loanAccount:this.loanAccount,
                // loanAccount:'50100030021017814',
                // loanAccount:'70100030002245143',
                picArr:uploadPicArr,
                remark:this.txtValue,
            },options);
            if(res &&res.respCode === '200100'){
                toast({content:'提交成功',time:'3000',showMask: false,})
                setTimeout(()=> {
                    this.reload();
                },1500)
            }
        },
        handleDelete(index){
            this.uploadPicArr.splice(index,1);
            this.imgs.splice(index,1);
            this.setBgImg(0,this.imgs,'upload');
            const stateTxt = this.getPageStatusTxt();
            const state = this.$store.state.status;
            if(state === 'need_upload' || state === 'uploaded_need_reupload'){
                sensors.track('delete_loancredentials',{
                    page_status:stateTxt
                })
            }
        },
        getPageStatusTxt(){
            const status = this.$store.state.status;
            let pageStatusTxt;
            switch(status){
                case 'need_upload':
                    pageStatusTxt = '待提交';
                    break;
                case 'uploaded_need_reupload':
                    pageStatusTxt = '重新提交';
                    break;
                case 'uploaded':
                    pageStatusTxt = '已提交';
                    break;
            }
            return pageStatusTxt;
        },
        handleView(index){
            this.showLargen = true;
            setTimeout(() => {
                this.setCalcuHeight(this.imgs);   
            },600)
            this.activeIndex = index + 1;
            this.swiper.activeIndex = index;
            const pageStatus = this.getPageStatusTxt();
            sensors.track('photothumbnail_click',{
                page_status:pageStatus
            })
            document.getElementById('outer').style.position = 'fixed';
        },
        updateSlideOrder() {
          const thisSelf = this;
          this.swiper.on("slideChange", val => {
            thisSelf.activeIndex = this.swiper.activeIndex + 1;
          });
        },
        hide(){
            this.showLargen = false;
            document.getElementById('outer').style.position = '';
        },
        async takePhotoApp(){
            this.getMultiImages();
        },
        async getMultiImages(){
            const pageStatus = this.$store.state.status;
            if(pageStatus === 'need_upload' ||pageStatus === 'uploaded_need_reupload'){
                const page_status = this.getPageStatusTxt();
                sensors.track('upload_loancredentials',{
                    page_status:page_status
                });
            }
            const imgCount = 10 - this.imgs.length;
            const data = {
                compressSize:200,
                imagesCount:imgCount
            }
            if(process.env.NODE_ENV === 'development'){
                getMultiImages(data,{
                    callback:res => {
                        console.log('index callback',res)
                        console.log('code',res.code)
                        if(res.code === '00'){
                            this.imgs = this.formatImages(res.images);
                            this.uploadPicArr = this.uploadPicture(res.images);
                        }
                    }
                });
            } else {
                await getMultiImages(data,res => {
                    const resData = JSON.parse(res);
                    if(resData.code === '00'){
                        this.dealImg(resData.images);
                    }
                })
            }
        },
        async dealImg(data){
            try{
                const len  = this.imgs.length;
                this.fromGrImg = this.formatImages(data);
                const addImg = await this.uploadPicture(data);
                //上传成功才显示图片
                if(addImg){
                    this.imgs = this.imgs.concat(this.formatImages(data));//4.修改
                    this.uploadPicArr = this.uploadPicArr.concat(addImg);
                    setTimeout(()=> {
                        this.setBgImg(len,addImg,'upload');
                    },1000)
                }   
            }catch(e){
                console.log('catch dealImg',e);
            }
        },
        //动态设置背景图片
        setBgImg(initLen,arr,type){
            for(let i = 0;i < arr.length;i++){
                let id = document.getElementById(`bgImg${initLen+i}`);
                id.style.backgroundImage = type === 'init'?`url(${arr[i].internetUrl})`:`url(${arr[i].internetUrl})`;
            }
        },
        formatImages(iArr){
            let formatedArr = [];
            for(let i =0;i< iArr.length;i++){
                let item = { internetUrl:"" };
                item.internetUrl = `data:image/jpeg;base64,${iArr[i]}`;
                formatedArr.push(item);
            }
            return formatedArr;
        },
        uploadPictureFail(){
            this.loadingImg = false;
            this.releaseFixBody();
            toast({content:'上传失败',time:'3000',showMask: false,});
        },
        fixBody(){
            const by = document.getElementsByTagName("body")[0];
            by.style.position = 'fixed';
        },
        releaseFixBody(){
            const by = document.getElementsByTagName("body")[0];
            by.style.position = '';
        },
        async uploadPicture(picArr){
            try{
                let uploadArr = [];
                let isok = false;
                this.loadingImg = true;
               this.fixBody();
                for(let i=0;i < picArr.length;i++){
                    const getTokenData = await getAntiRepeatToken();
                    let data = {
                        base64Str:`data:image/jpeg;base64,${picArr[i]}`,
                        antiRepeatToken:getTokenData.data.antiRepeatToken,
                        internetFlag:'Y'
                    }
                    const res = await uploadPicture(data,{errHandler:this.uploadPictureFail});
                    const resData = res.data;
                    if(res && res.respCode.slice(0,1) === '2'){
                        if( i === picArr.length - 1){
                            console.log('最后一张成功');
                            isok = true;
                            console.log('isok',isok)
                        }
                        uploadArr.push({
                            uploadFile:resData.uploadFile,
                            internetUrl:resData.internetUrl
                        });
                    } else {
                        this.loadingImg = false;
                        this.releaseFixBody();
                        console.log('一张失败');
                        isok = false;
                        console.log('isok',isok)
                    }
                }
                this.loadingImg = false;
                this.releaseFixBody();
                if(isok){
                    toast({content:'上传成功',time:'3000',showMask: false,});
                    console.log('all upload pic return',uploadArr)
                    return uploadArr;
                }    
            } catch(e){
                console.log('uploadpicture',e)
            }
        },
        getTxtHeight(val){
            if(!this.txtValue){
                const txt = document.getElementById('instructions');
                txt.rows = 1;
            } else {
                this.txtHeight = calcTextareaHeight(this.$refs.textarea,val).height;
            }
        },
        goBack(){
            closeWebView(); 
        },
        setCalcuHeight(arr){
            for(let i=0;i<arr.length;i++){
                let container = document.getElementById(`largImg${i}`);
                const imgHeight = window.getComputedStyle(container).height;
                if(parseFloat(imgHeight) > document.documentElement.clientHeight){
                    const domId = document.getElementById('largView'+i);
                    domId.style.display = 'block';
                }

            }
        },
    },
}
</script>
<style lang='scss' scoped>
.outer-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $grayBg;
}
.header{
    // height: 185px;
    height: 205px;
    background: linear-gradient(to bottom, rgba(81, 133, 254, 1),rgba(47, 94, 255, 1));
}
.title-bar {
    z-index: 5;
    padding-top: 20px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-family: PingFangSC-Regular;
    font-size:$fontSize18;
    color:$titleWhite;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    img{
        // position:absolute;
        height: 20px;
        width: auto;
        margin-left: 14px;
    }
    span{
        position: absolute;
        padding-top: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
    }

}
.wraper {
    margin: 0 auto;
    width: 349px;
    border-radius: 5px;
    background-color: $grayBg;
    position: absolute;
    // top: 152.5px;
    // top: 172.5px;
    top: 170px;
    left: 50%;
    margin-left: -173.5px;
}
.default-container{
    display: flex;
    box-sizing: border-box;
    box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.06);
    flex-direction: column;
    background-color: $white;
    width:100%;
    margin: 0 auto;
    padding: 0px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    z-index: 10;
    textarea {
        resize: none;
        outline: none;
        // overflow-y: hidden;
        width: 100%;
        box-sizing: border-box;
        border: none;
        margin: 0 auto;
        width: 317px;
        font-size:$fontSize13;
        font-family: SourceHanSansCN-Regular;
        color:$baseFontColor;
        margin: 0 14.5px 20px;
        padding: 15.5px 13.5px 14.5px 9.5px;
        border-radius: 2px;
        background: $lightGray;
        // min-height: 34px!important;
        &::-webkit-input-placeholder{
            color:$palceHolderGray;
        }
        &::-moz-input-placeholder{
            color:$palceHolderGray;
        }
        &::-ms-input-placeholder{
            color:$palceHolderGray;
        }
    }
}
.upload_box{
    position: relative;
    float: left;
    width: 70px;
    height: 70px;
    margin: 0 12.5px 0 0;
    border-radius: 2px;
}
.add_upload .add_upload_button{
    font-family: PingFangSC-Regular;
    font-size: $fontSize10;
    background: $lightGray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: .6Px dashed $borderGray;
    color: $borderGray;
    img{
        width: 21px;
        height: 18.5px;
        // margin-top: 15.5px;
    }
    span{
        display: inline-block;
        margin-top: 11.5px;
        color: $fontGray;
        font-size: $fontSize10;
    }
}
.add_upload_imgDiv {
    position: relative;
    img.add_upload_close{
        position: absolute;
        top: -3.5px;
        right: -3.5px;
        width: 14px;
        height: 14px;
    }
    .itemImg {
        width: 70px;
        height: 70px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position:center center;
        background-size: cover;
    }
}
.credentials-title {
    color: $baseFontColor;
    font-family: SourceHanSansCN-Regular;
    font-size: $fontSize14;
    display: inline-block;
    padding: 14.5px;
    text-align: left;
}
.box{
    padding: 0 14.5px 14.5px;
    div:nth-of-type(4n){
        margin-right: 0;
    }
    div:nth-of-type(n+5){
        margin-top: 14px;
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
  position: absolute;
  width: 100vw;
  min-height: 100vh;
//   height: auto;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 1);
  justify-content: center;
  z-index: 11;
  .large-view{
      display: flex;
    //justify-content: center;//不必要
      align-items: center;;//必要
      width: 100%;
    //min-height: 100%;
      min-height: 100vh;
          overflow-y: scroll;

          position: relative;
      img{
        width:100%;
        height: auto;
      }
  }
  img {
    width: 100%;
    // height: auto;
    display: block;

  }
}
.btn {
    margin-top: 24.5px;
    margin-bottom: 30px;
button {
  width: 100%;
  display: block;
  margin: 0 auto;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  font-size: $fontSize16;
  font-family: PingFangSC-Regular;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  border: none;
  z-index: 10;
  color: $white;
  position: relative;
}
}
.abled {
    background:$baseBlue;
}
.disabled{
    background-color: $borderGray;
}
.auditOpinion{
    text-align: left;
    color: #e5e5e5;
}
</style>