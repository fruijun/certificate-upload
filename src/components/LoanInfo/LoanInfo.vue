<template>
    <div class="loan-info">
        <div class="account">
            <span>贷款账号</span>
            <span>{{ loanInfo.account }}</span>
        </div>
        <div class="detail">
            <div class="detail-item amount">
                <span>借款金额</span>
                <span>{{ loanInfo.amount }}<span class="unit">元</span></span>
            </div>
            <div class="detail-item loantime">
                <span>放款时间</span>
                <span>{{ loanInfo.time }}</span>
            </div>
            <div class="detail-item use">
                <span>贷款用途</span>
                <span>{{ loanInfo.use }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { formatString } from '@/utils/filter';

export default {
name:'LoanInfo',
props:{
    loanInfo:{
        type:Object,
        required:true,
    }
},
}
</script>

<style lang="scss" scoped>
.loantime:after,.amount:after{
     content: "";
      width: 1Px;
      height: 35px;
      background:rgba(255,255,255,.5);
    //   background:red;
      border-radius: 20px;
      position: absolute;
      right: 0;
      top: 0;
}
.loan-info{
    width: 100%;
    height: 200px;
    margin-top: 5px;
    z-index: 5;
    .account {
        text-align: center;
        width: 220px;
        height: 24px;
        margin: 0 auto;
        line-height: 24px;
        box-sizing: border-box;
        border-radius: 12px;
        background-color:rgba(255,255,255,.2);
        color: $fontWhite;
        span:nth-child(1){
            font-size: $fontSize13;
            padding-right: 10px;
        }
    }
    .detail {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        color: $white;
        &-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            margin-bottom: 19.5px;
            flex: 1;
            //   &:not(:last-child):after {
            //   content: "";
            //   width: .6Px;
            //   height: 35px;
            //   background:rgba(255,255,255,.5);
            //   border-radius: 20px;
            //   position: absolute;
            //   right: 0;
            //   top: 0;
            // }
            span:nth-of-type(1){
                font-size: $fontSize13;
                color: rgba(255,255,255,.7);
                font-family: SourceHanSansCN-Normal;
                font-weight: normal;
       
            }
            span:nth-of-type(2){
                font-family: PingFangSC-Medium;
                font-weight: 500;
                font-size: $fontSize15;
                span {
                    margin-left: 4.5px;
                    display: inline-block;
                    font-family: SourceHanSansCN-Normal;
                    font-size: $fontSize12;
                    color: $white;
                }
            }
        }
    }
}
     .time:after{
               content: "";
              width: 1Px;
              height: 35px;
              background:rgba(255,255,255,.5);
              border-radius: 20px;
              position: absolute;
              right: 0;
              top: 0;
        }
</style>