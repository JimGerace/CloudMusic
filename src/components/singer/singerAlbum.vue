<template>
  <div class="singerAlbumBox">
    <div class="albumBox">
        <div class="albumItem" v-for="(item,index) in albumlist" :key="index" @click="toAlbum(item.id)">
            <img v-lazy="item.blurPicUrl+'?param=200y200'">
            <span class="songName">{{item.name}}</span>
            <p class="creatTime">{{item.publishTime | Form('yy-mm-dd')}}</p>
        </div>
    </div>

    <!-- 分页 -->
    <el-pagination @current-change='handleCurrentChange' :page-size="limit" background layout="prev,pager,next" :total="albumNum"></el-pagination>
  </div>
</template>

<script>
export default {
    props: ['albumNum'],
    data () {
        return {
            id: this.$route.params.id,
            limit: 50,
            offset: 0,
            albumlist: []
        }
    },
    methods: {
        //获取歌手的专辑
        getSingerAlbum(){
            this.$api.singerAlbum(this.id, this.limit, this.offset).then(res => {
                this.albumlist = res.data.hotAlbums
            })
        },
        //监听当前页数变化
        handleCurrentChange(val){
            this.offset = (val-1)*this.limit
            this.getSingerAlbum()
        },
        //跳转到专辑页面
        toAlbum(id){
            this.$router.push(`/album/${id}`)
        }
    },
    mounted(){
        this.getSingerAlbum()
    },
    watch: {
        albumNum(newVal){
            this.albumNum = newVal
        },
        $route(){
            this.id = this.$route.params.id
            this.getSingerAlbum()
        }
    }
}
</script>

<style lang='less' scoped>
.albumBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.albumItem{
    display: flex;
    width: 18%;
    margin: 10px;
    flex-direction: column;
    cursor: pointer;
    &:hover{
        color: #C62F2F;
    }
    img{
        width: 140px;
        height: 140px;
    }
    .songName{
        display: block;
        width: 140px;
        font-size: 13px;
        margin-top: 2px;
    }
    .creatTime{
        font-size: 12px;
        color: #888;
    }
}

.el-pagination{
    padding: 5px 0px 40px 0px;
    text-align: center;
}
</style>