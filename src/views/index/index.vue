<template>
    <div class="group-pic">
        <div class="added_upload_imgBox">
            <div class="upload_box add_upload_imgDiv" v-for="(item,index) in imgs" :key="index">
                <img class="img" :src="item.base64"/>
                <p class="add_upload_close" @click="handleDeleteImg(item.id)">
                    <img src="../../assets/img/close.png"/>
                </p>
            </div>

            <div v-if="canUpload" class="upload_box add_upload">
                <button @click="takePhotoApp" class="add_upload_button">
                    <img class="add_upload_icon" src="../../assets/img/upload.png"/>
                    <span v-if="hasPicture">{{ count }}/{{ total }}</span>
                    <span v-else>上传凭证</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'takePicture',
    props:{
        // hasPicture:{
        //     type:Boolean,
        //     default:false,
        // }
    },
    data(){
        return {
            count:0,
            total:10,
            hasPicture:false,
            imgs:[],
        }
    },
    computed:{
        canUpload(){
            return this.count < this.total;
        }
    },
    methods:{
        handleDeleteImg(id){
            let that = this;

        }
    },
}
</script>
<style lang='scss' scoped>
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
    border: 1Px dashed gray;
}
.add_upload_imgDiv {
    position: relative;
    .add_upload_close {
        position: absolute;
    }
}
.add_upload_imgBox .add_upload_imgDiv img{
 width: 100%;
 height: 100%;
}
.add_upload_imgBox .add_upload_close{
    position: absolute;
    top: -50%;
    right: -40%;
    width: 30px;
    height: 30px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>