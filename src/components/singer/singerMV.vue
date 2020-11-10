<template>
  <div class="mvBox">
      <div @click="toMvPage(item.id)" class="mvItem" v-for="(item,index) in mvlist" :key="index">
          <div class="playCount">
              <i class="el-icon-video-camera"></i>
              <span class="num">{{item.playCount}}</span>
          </div>
          <div class="duration">
              <span>{{item.duration | FormTime()}}</span>
          </div>
          <img v-lazy="item.imgurl16v9+'?param=200y130'">
          <p>{{item.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            id: this.$route.params.id,
            mvlist: []
        }
    },
    methods: {
        //获取歌手mv
        getSingerMV(){
            this.$api.singerMv(this.id).then(res => {
                this.mvlist = res.data.mvs
                this.playcount(this.mvlist, 'playCount')
            })
        },
        //跳转到mv详情页
        toMvPage(id){
            this.$emit('closedFooter')
            this.$router.push(`/mv/${id}`)
        }
    },
    mounted(){
        this.getSingerMV()
    },
    watch:{
        $route(){
            this.id = this.$route.params.id
            this.getSingerMV()
        }
    }
}
</script>

<style lang='less' scoped>
.mvBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 40px;

    .mvItem{
        cursor: pointer;
        position: relative;
        width: 15%;
        margin: 20px 20px;
        &:hover{
            color: #C62F2F;
        }

        .playCount{
            position: absolute;
            width: 100%;
            height: 20px;
            line-height: 20px;
            color: #fff;
            background: rgba(128, 128, 128, 0.2);
            i{
                font-size: 16px;
                margin-left: 5px;
            }
            .num{
                font-size: 15px;
                margin-left: 3px;
            }
        }
        .duration{
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 20px;
            line-height: 20px;
            color: #fff;
            background: rgba(128, 128, 128, 0.2);
            span{
                font-size: 13px;
                margin-left: 5px;
            }
        }
        img{
            width: 100%;
            height: 100%;
        }
        p{
            width: 100%;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>