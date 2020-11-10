<template>
  <div class="reSingerBox">
    <div v-if="resemblelist" @click="toResemble(item.id)" class="reSingerItem" v-for="(item,index) in resemblelist" :key="index">
      <img v-lazy="item.img1v1Url+'?param=200y200'">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      id: this.$route.params.id,
      resemblelist: []
    }
  },
  mounted(){
    if(window.localStorage.getItem('cookie')){
      this.getResembleSinger()
    }
  },
  methods: {
    //获取相似歌手数据
    async getResembleSinger(){
      this.$api.simiSinger(this.id).then(res => {
        this.handleSingerNum(res.data.artists)
      })
    },
    //跳转到歌手详情页
    toResemble(id){
      this.$emit('toResemble', id)
    },
    //限制18个相似歌手
    handleSingerNum(list){
      this.resemblelist = []
      for(let i=0; i<18; i++){
        this.resemblelist.push(list[i])
      }
    }
  },
  watch:{
    $route(){
      this.id = this.$route.params.id
      this.getResembleSinger()
    }
  }
}
</script>

<style lang='less' scoped>
.reSingerBox{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 40px;
  .reSingerItem{
    cursor: pointer;
    padding: 10px 20px;
    &:hover{
      color: #C62F2F;
    }
    img{
      width: 116px;
      height: 116px;
    }
    p{
      text-align: center;
    }
  }
}
</style>