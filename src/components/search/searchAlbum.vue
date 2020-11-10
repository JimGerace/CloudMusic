<template>
  <div class="searchAlbumBox">
      <div class="albumItem" @click="toAlbumPage(item.id)" v-for="(item,index) in albumlist" :key="index">
          <img v-lazy="item.picUrl+'?param=200y200'">
          <span class="title">{{item.name}}</span>
          <span class="singername">{{item.artist.name}}</span>
          <span class="creatTime">{{item.publishTime | Form('yy-mm-dd')}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: ['albumlist'],
    data(){
        return{

        }
    },
    mounted(){
    },
    methods:{
        // 跳转到专辑详情页
        toAlbumPage(id){
            this.$router.push(`/album/${id}`)
        }
    },
    watch:{
        albumlist(newval){
            this.albumlist = newval
        }
    }
}
</script>

<style lang='less' scoped>
.searchAlbumBox{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 40px;

    .albumItem{
        cursor: pointer;
        width: 15%;
        display: flex;
        margin: 15px 0px;
        flex-direction: column;
        
        &:hover{
            color: #C62F2F;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .title{
            overflow: hidden;
            width: 100%;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .singername{
            color: #999;
            font-size: 13px;
            margin: 5px 0px;
        }
        .creatTime{
            color: #999;
            font-size: 13px;
        }
    }
}
</style>