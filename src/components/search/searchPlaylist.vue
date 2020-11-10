<template>
  <div class="playlistBox">
      <div @click="toSonglist(item.id)" class="listItem" v-for="(item,index) in playlist" :key="index">
          <div class="playcountBox">
              <i class="el-icon-caret-right"></i>
              <span>{{item.playCount}}</span>
          </div>
          <img v-lazy="item.coverImgUrl+'?param=200y200'">
          <p>{{item.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['playlist'],
    data(){
        return{

        }
    },
    mounted(){
        
    },
    methods:{
        //跳转到歌单详情页
        toSonglist(id){
            this.$router.push(`/songlist/${id}`)
        }
    },
    watch:{
        playlist(newval){
            this.playlist = newval
        }
    }
}
</script>

<style lang='less' scoped>
.playlistBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 40px;
    .listItem{
        cursor: pointer;
        width: 17%;
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 15px 0px;

        &:hover{
            color: #C62F2F;
        }
        .playcountBox{
            position: absolute;
            top: 0;
            color: #fff;
            width: 100%;
            height: 20px;
            background: rgba(128, 128, 128, 0.2);
            i{
                margin-left: 3px;
            }
        }
        img{
            width: 100%;
            border-radius: 5px;
            margin-bottom: 5px;
        }
        p{
            width: 100%;
            font-size: 15px;
            overflow: hidden;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>