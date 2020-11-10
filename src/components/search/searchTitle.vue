<template>
  <div class="searchBox">
      <!-- 头部 -->
      <div class="header-search">搜索结果</div>

      <!-- tabs标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="单曲" name="music">
            <!-- 音乐列表 -->
            <search-music @openSong='openSong' :musiclist='musiclist'></search-music>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="singer">
            <!-- 歌手列表 -->
            <search-singer :singerlist='singerlist'></search-singer>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="album">
            <!-- 专辑列表 -->
            <search-album :albumlist='albumlist'></search-album>
        </el-tab-pane>
        <el-tab-pane label="视频" name="video">
            <!-- 视频列表 -->
            <search-video @closedFooter='closedFooter' :videolist='videolist'></search-video>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="playlist">
            <!-- 歌单列表 -->
            <search-playlist :playlist='playlist'></search-playlist>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const searchMusic = () => import('./searchMusic')
const searchSinger = () => import('./searchSinger')
const searchVideo = () => import('./searchVideo')
const searchAlbum = () => import('./searchAlbum')
const searchPlaylist = () => import('./searchPlaylist')
export default {
    data(){
        return{
            //单曲列表
            musiclist: [],
            //歌手列表
            singerlist: [],
            //专辑列表
            albumlist: [],
            //视频列表
            videolist: [],
            //歌单列表
            playlist: [],
            //激活的标签页
            activeName: 'music',
            //单曲列表id
            listId: []
        }
    },
    mounted(){
        this.initialization()
    },
    watch:{
        $route(){
            this.initialization()
        }
    },
    methods:{
        // 获取搜索单曲内容信息
        getSearchMusicData(){
            this.$api.search(this.$store.state.searchContent, 1).then(res => {
                this.musiclist = res.data.result.songs
                this.handlelistId(this.musiclist)
            })
        },
        //获取搜索 歌手内容信息
        getSearchSingerData(){
            this.$api.search(this.$store.state.searchContent, 100).then(res => {
                this.singerlist = res.data.result.artists
            })
        },
        //获取搜索 专辑内容信息
        getSearchAlbumData(){
            this.$api.search(this.$store.state.searchContent, 10).then(res => {
                this.albumlist = res.data.result.albums
            })
        },
        //获取搜索 视频内容信息
        getSearchVideoData(){
            this.$api.search(this.$store.state.searchContent, 1014).then(res => {
                this.videolist = res.data.result.videos
                this.playcount(this.videolist, 'playTime')
            })
        },
        //获取搜索 歌单内容信息
        getSearchPlaylistData(){
            this.$api.search(this.$store.state.searchContent, 1000).then(res => {
                this.playlist = res.data.result.playlists
                this.playcount(this.playlist, 'playCount')
            })
        },
        //接受子组件传递过来的事件，再向根组价传递
        openSong(){
            this.changeCurrentPlaylist(this.musiclist)
            this.changeListId(this.listId)
            this.$emit('openSong')
        },
        //获取单曲列表id
        handlelistId(list){
            //重置
            this.listId = []
            for(let i=0; i<list.length; i++){
                this.listId.push(list[i].id)
            }
        },
        //接收子组件传递的事件，再向根组件传递
        closedFooter(){
            this.$emit('closedFooter')
        },
        //初始化
        initialization(){
            this.getSearchMusicData()
            this.getSearchSingerData()
            this.getSearchAlbumData()
            this.getSearchVideoData()
            this.getSearchPlaylistData()
        },
        ...mapMutations({
            changeCurrentPlaylist: 'PUT_CURRENTPLAYLIST',
            changeListId: 'PUT_LISTID'
        })
    },
    components: {
        searchMusic,
        searchSinger,
        searchAlbum,
        searchVideo,
        searchPlaylist
    }
}
</script>

<style lang='less' scoped>
.header-search{
    font-size: 22px;
    font-weight: 600;
    color: #4A4A4A;
    margin-bottom: 10px;
}
</style>