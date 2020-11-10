<template>
  <div class="searchSingerBox">
      <div class="singerItem" @click="toSingerPage(item.id)" v-for="(item,index) in singerlist" :key="index">
          <img v-lazy="item.img1v1Url+'?param=100y100'">
          <p>{{item.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['singerlist'],
    data(){
        return{

        }
    },
    mounted(){
    },
    methods:{
        //跳转到歌手详情页
        toSingerPage(id){
            this.$router.push(`/singer/${id}`)
        }
    },
    watch:{
        singerlist(newval){
            this.singerlist = newval
        }
    }
}
</script>

<style lang='less' scoped>
.searchSingerBox{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;

    .singerItem{
        cursor: pointer;
        width: 138px;
        height: 182px;
        text-align: center;

        &:hover{
            color: #C62F2F;
        }
        img{
            width: 108px;
            height: 108px;
            border-radius: 50%;
            padding-bottom: 5px;
        }
        p{
            width: 100%;
            font-size: 13px;
            font-weight: 600;
            line-height: 18px;
            text-align: center;
        }
    }
}
</style>