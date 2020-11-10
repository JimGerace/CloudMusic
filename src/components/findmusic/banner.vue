<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <el-image style="height: 300px" :src="item.imageUrl+'?param=640y300'" fit="contain"></el-image>
        </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommendMusicBox">
        <div class="recommendTitle">
            <h1>推荐歌单</h1>
        </div>
        <ul class="musicBox">
            <li v-for="(item,index) in recommendItem" :key="index">
                <a href="javascript:;" @click="toSonglist(item.id)">
                    <span class="countBox">
                        <i class="iconfont icon-erji"></i>
                        <label>{{item.playCount}}</label>
                    </span>
                    <img v-lazy="item.coverImgUrl+'?param=200y200'"></img>
                </a>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>

    <!-- 独家放送 -->
    <div class="soleSend">
        <div class="soleTitle">
            <h1>独家放送</h1>
        </div>
        <ul>
            <li @click="toMVPage(item.id)" v-for="(item,index) in privateList" :key="index">
                <a href="javascript:;">
                    <img v-lazy="item.sPicUrl+'?param=400y400'"></img>
                </a>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>

    <!-- 最新音乐 -->
    <div class="lastestMusic">
        <div class="lastestTitle">
            <h1>最新音乐</h1>
        </div>
        <div class="musicList">
            <div class="musicItem" v-for="(item,index) in lastestList" :key="index">
                <span class="itemIndex">{{ index < 9? ('0'+(index+1)) :index+1}}</span>
                <a href="javascript:;" @dblclick="selectedMusic(item.id)">
                    <img v-lazy="item.picUrl+'?param=200y200'"></img>
                </a>
                <div class="musicDetail">
                    <p class="musicName">{{item.name}}</p>
                    <span class="musicArtists">{{item.song.artists[0].name}}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return{
            bannerList: [],
            recommendItem: [],
            privateList: [],
            lastestList: [],
            //右底部列表
            playlist: [],
            //右底部列表歌曲id
            listId: []
        }
    },
    mounted(){
        this.initialization()
    },
    methods: {
        //播放该歌曲
        selectedMusic(id){
            this.changeCurId(id)
            this.changeCurrentPlaylist(this.playlist)
            this.changeListId(this.listId)
            this.$emit('openSong')
        },
        // 获取轮播图
        getBanner(){
            this.$api.banner().then(res => {
                this.bannerList = res.data.banners
            })
        },
        //获取推荐歌单列表数据
        getRecommendMusic(){
            this.$api.recommendPlaylist().then(res => {
                this.recommendItem = res.data.playlists
                this.playcount(this.recommendItem,'playCount')
            })
        },
        //获取独家放送歌单
        getPrivateMusic(){
            this.$api.privateMusic().then(res => {
                this.privateList = res.data.result
            })
        },
        //获取最新音乐
        getLastestMusic(){
            this.$api.lastestMusic().then(res => {
                this.lastestList = res.data.result
                this.handlePlaylist(this.lastestList)
            })
        },
        //跳转到歌单页面
        toSonglist(id){
            this.$router.push(`/songlist/${id}`)
        },
        //处理右底部列表
        handlePlaylist(list){
            this.playlist = [];
            list.forEach(item => {
                this.playlist.push(item.song)
                this.listId.push(item.song.id)
            })
        },
        //跳转到MV页面
        toMVPage(id){
            this.$emit('closedFooter')
            this.$router.push(`/mv/${id}`)
        },
        //初始化
        initialization(){
            this.getBanner()
            this.getRecommendMusic()
            this.getPrivateMusic()
            this.getLastestMusic()
        },
        ...mapMutations({
            changeCurId: 'PUT_CURID',
            changeCurrentPlaylist: 'PUT_CURRENTPLAYLIST',
            changeListId: 'PUT_LISTID'
        })
    }
}
</script>

<style lang='less' scoped>
.recommendMusicBox{
    width: 100%;
    .recommendTitle{
        width: 100%;
        padding: 10px 0;
        border-bottom: 2px solid #eee;
        h1{
            font-size: 24px;
            font-weight: 500;
        }
    }
    .musicBox{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
        li{
            display: flex;
            width: 15%;
            height: 15%;
            padding: 15px 0;
            flex-direction: column;
            &:hover{
                color: #C62F2F;
            }

            a{
                color: #fff;
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 10px;
                margin-bottom: 5px;

                .countBox{
                    position: absolute;
                    display: block;
                    width: 100%;
                    height: 21px;
                    border-radius: 10px 10px 0px 0px;
                    background: rgba(128, 128, 128, 0.2);
                    i{
                        font-size: 18px;
                        font-weight: 600;
                        margin: 0 4px;
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    box-shadow: grey 0px 0px 2px 2px;
                }
            }
            span{
                font-size: 14px;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
// 独家放送
.soleSend{
    width: 100%;
    padding-top: 10px;
    .soleTitle{
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
        h1{
            font-size: 24px;
            font-weight: 500;
        }
    }
    ul{
        display: flex;
        width: 100%;
        padding: 20px 0 50px 0;
        justify-content: space-around;
        li{
            width: 30%;
            border-radius: 10px;
            &:hover{
                color: #C62F2F;
            }

            img{
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }
            span{
                display: block;
                width: 100%;
                font-size: 14px;
                overflow: hidden;
                padding-top: 5px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
// 最新音乐
.lastestMusic{
    padding-top: 20px;
    .lastestTitle{
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
        h1{
            font-size: 24px;
            font-weight: 500;
        }
    }
    .musicList{
        display: flex;
        flex-wrap: wrap;
        padding: 28px 0px;
        border-bottom: 2px solid #eee;
        .musicItem{
            display: flex;
            width: 50%;
            height: 80px;
            font-size: 14px;
            color: #606266;
            padding: 10px 0px;
            align-items: center;
            &:hover{
                background-color: #F5F7FA;
            }   
            .itemIndex{
                padding: 0 30px 0 10px;
            }
            a{
                display: block;
                width: 75px;
                height: 75px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .musicDetail{
                margin-left: 10px;
            }
        }
    }
}
</style>