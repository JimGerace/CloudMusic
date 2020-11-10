<template>
  <div class="searchVideoBox">
      <div class="videoItem" @click="toVideoPage(item.vid)" v-for="(item,index) in videolist" :key="index">
          <div class="playcountBox">
              <i class="el-icon-caret-right"></i>
              <span>{{item.playTime}}</span>
          </div>
          <img v-lazy="item.coverUrl+'?param=315y175'">
          <p>{{item.title}}</p>
          <div class="durationBox">
              <span>{{item.durationms | FormTime()}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['videolist'],
    data(){
        return{

        }
    },
    mounted(){
    },
    methods:{
        // 跳转到视频详情页
        toVideoPage(id){
            // 如果没登录则不能进行跳转
            if(window.localStorage.getItem('cookie')){
                // 关闭底部进度条
                this.$emit('closedFooter')
                this.$router.push(`/video/${id}`)
            }else{
                return this.$message.error('请登录先，再进行操作')
            }
        }
    },
    watch:{
        videolist(newval){
            this.videolist = newval
        }
    }
}
</script>

<style lang='less' scoped>
.searchVideoBox{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 40px;
    .videoItem{
        cursor: pointer;
        width: 15%;
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 10px 0px;

        &:hover{
            color: #C62F2F;
        }
        .playcountBox{
            position: absolute;
            top: 0px;
            color: #fff;
            width: 100%;
            height: 20px;
            line-height: 20px;
            background: rgba(128, 128, 128, 0.2);

            i{
                margin-left: 5px;
            }
        }

        img{
            width: 100%;
            height: 100%;
            margin-bottom: 5px;
        }
        p{
            overflow: hidden;
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .durationBox{
            position: absolute;
            bottom: 25px;
            color: #fff;
            width: 100%;
            height: 20px;
            background: rgba(128, 128, 128, 0.2);
            span{
                margin-left: 5px;
            }
        }
    }
}
</style>