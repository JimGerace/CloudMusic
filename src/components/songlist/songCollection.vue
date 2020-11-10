<template>
  <div class="musicCollectionBox">
    <!-- 收藏者列表 -->
    <div class="collectionBox">
        <div class="collectionItem" v-for="(item,index) in collectionlist" :key="index">
            <img v-lazy="item.avatarUrl+'?param=100y100'">
            <p class="username">{{item.nickname}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            id: this.$route.params.id,
            limit: 20,
            offset: 0,
            collectionlist: [],
        }
    },
    mounted(){
        this.getCollectionData()
    },
    watch: {
        $route(){
            this.id = window.localStorage.getItem('currentId')
            this.getCollectionData()
        }
    },
    methods: {
        // 获取歌单收藏者信息
        getCollectionData(){
            this.$api.subscribers(this.id, this.limit, this.offset).then(res => {
                this.collectionlist = res.data.subscribers
            })
        }
    }
}
</script>

<style lang='less' scoped>
.collectionBox{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
    .collectionItem{
        width: 120px;
        height: 90px;
        margin: 10px 29px;
        text-align: center;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        p{
            font-size: 13px;
        }
    }
}
</style>