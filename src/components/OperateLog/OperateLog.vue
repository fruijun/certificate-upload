<template>
  <div class="default-container default-marginTop">
    <Title title="操作记录"></Title>
    <div class="log-container">
        <div class="log-item" v-for="(item,index) in credentialsInfo.operations" :key="index">
            <span>{{ item.eventDesc }}</span>
            <span>{{ item.eventTime }}</span>
        </div>
    </div>
    <div v-if="$store.state.status === 'uploaded_need_reupload'" class="auditOpinion"><span>审核意见:</span>{{ credentialsInfo.auditMessage }}</div>
  </div>
</template>

<script>
import Title from '@/components/Title/Title';

export default {
    name:'OperateLog',
    props:{
        credentialsInfo:{
            type:Object
        }
    },
    components:{
        Title,
    },
    filters:{
        formatTime(val){
          return `${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(6, 8)}`;
        }
    },
}
</script>

<style lang="scss" scoped>
.default-marginTop{
    margin-top: 10px!important;
}
.log-container{
    padding: 14.5px 13.5px 14px 14.5px;
    .log-item:not(:last-child){
        margin-bottom: 14.5px;
    }
}
.log-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: $baseFontColor;
    font-size: $fontSize14;
    font-family: SourceHanSansCN-Regular;
    // margin-top: 14.5px;
    span:nth-of-type(2){
        color: $fontGray;
        font-size: $fontSize14;
    }
}
.auditOpinion{
    font-size: $fontSize14;
    color: $fontGray;
    padding: 10.5px 14.5px 11px;
    text-align: left;
    border-top: 0.6px solid $grayLine;
    word-break: break-all;
    span{
        word-break: normal;
    }
}

</style>