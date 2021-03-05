<template>
<Popup :zIndex="zIndex" v-show="showPopover" @EVENT_MASK_CLICK="maskClick">
    <div :class="['popover-container',skin]">
        <slot name="popoverTitle">
            <div class="popover-title" v-show="title.length >0">{{ title }}</div>
        </slot>
        <slot name="popoverContent">
            <div class="popover-content-area" :class="multiContent ? 'popover-multi-content':''">
                <div ref="popoverContent" class="popover-content" :class="contentTextAlign === 'left' ? 'textIndex':''" :style="{ textAlign:`${contentTextAlign }`}">
                    {{ content }}
                </div>
            </div>
        </slot>
        <div class="popover-button-area">
            <span v-if="showCancelButton" @click="clickHandler('cancel')" class="popover-button cancel-button">{{ cancelButtonText }}</span>
            <span @click="clickHandler('confirm')" class="popover-button confirm-button">{{ confirmButtonText }}</span>
        </div>
    </div>
</Popup>
</template>
<script type="es6">
import Popup from '@/components/Popup/Popup';
export default {
    name:'Popover',
    data(){
        return {
            multiContent:false,
            showPopover:false,
        }
    },
    components:{
        Popup,
    },
    mounted(){},
    props:{
        title:{
            type:String,
            default:'温馨提示',
        },
        skin:{
            type:String,
            default:'pop-default',
        },
        contentTextAlign:{
            type:String,
            default:'left',
        },
        content:{
            type:String,
            default:'',
        },
        //显示取消按钮
        showCancelButton:{
            type:Boolean,
            default:true,
        },
        //取消按钮文案
        cancelButtonText:{
            type:String,
            default:'取消',
        },
        //确定按钮文案
        confirmButtonText:{
            type:String,
            default:'确定',
        },
        clickOnClickMask:{
            type:Boolean,
            default:true,
        },
        zIndex:{
            type:[Number,String],
            default:10000,
        },
    },
    methods:{
        getMultiContent(){
            let node = this.$refs.popoverContent;
            //若查槽替代了内容，则拿不到node
            if(!!node){
                let css = window.getComputedStyle(node);
                let height = parseInt(css.height);
                let lineHeight = parseInt(css.lineHeight);
                if(height >= parseInt(lineHeight *1.5)){
                    this.multiContent = true;
                } else {
                    this.multiContent = false;
                }
            }
        },
        clickHandler(type){
            this.$emit('click',type);
        },
        show(){
            this.showPopover = true;
        },
        hide(){
            this.showPopover = false;
        },
        maskClick(e){
            this.$emit('EVENT_MASK_CLICK',e);
            if(this.clickOnClickMask){
                this.hide();
            }
        },
    },
    watch:{
        showPopover(value){
            this.$emit('change',value);
        }
    },

}
</script>
<style lang="scss" scoped>
.popover-container{
    width: 280px;
    border-radius:10px;
    background-color: #fff;
}
.popover-title{
    padding: 20px 20px 0;
    font-size: 16px;
    text-align: center;
    color: #333;
}
.popover-content-area{
    font-size: $fontSize15;
    line-height: 8px;
    max-height:440px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 13px;
    margin-bottom: 13px;
    color: #666;
}
.popover-button-area {
  border-top: 1px solid #e5e5e5; /*no*/
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
}
.popover-content-area.popover-multi-content {
    margin-top: 33px;
    margin-bottom: 33px;
}
.popover-content {
    font-size: 14px !important;
    line-height: 36px;
    word-wrap: break-word;
    &.textIndex{
        text-indent:30px;
    }
}
.popover-button{
    text-align: center;
    flex-grow: 1;
    font-size: 15px;
    line-height: 44px;
    height: 44px;
}
.cancel-button{
    border-right: 1px solid #e5e5e5;
    color: #666;
    &:active{
        color: #333;
    }
}
.confirm-button{
    color:#488ff0;
    &:active{
        color: #296dcc;
    }
}
</style>
