<template>
  <div class="musicList">
      <!-- 热门歌单标签 -->
      <div class="tagsBox">
          <span>热门标签:</span>
          <span @click="giveClassName(index)" class="tags" v-for="(item,index) in musicTag" :key="index">{{item.name}}</span>
      </div>

      <!-- 歌单列表 -->
      <ul class="listBox">
          <li class="listItem" v-for="(item,index) in topPlaylist" :key="index">
              <a href="javascript:;" @click="toSonglist(item.id)">
                  <div class="playcount">
                      <i class="iconfont icon-erji"></i>
                      <span>{{item.playCount}}</span>
                  </div>
                  <img v-lazy="item.coverImgUrl+'?param=200y200'"></img>
                  <p>{{item.name}}</p>
              </a>
          </li>
      </ul>

      <!-- 分页 -->
      <el-pagination @current-change='handleCurrentChange' :page-size='limit' layout="prev, pager, next" :total="musicTotal"></el-pagination>
  </div>
</template>

<script>
export default {
    data(){
        return{
            musicTag: [],
            topPlaylist: [],
            cat: '全部',
            limit: 24,
            offset: 0,
            musicTotal: 0
        }
    },
    mounted(){
        this.getHotTag()
        this.getTopPlayList()
    },
    methods:{
        // 获取热门歌单标签
        getHotTag(){
            this.$api.hotPlaylistTags().then(res => {
                this.musicTag = res.data.tags
            })
        },
        //获取精选歌单
        getTopPlayList(){
            this.$api.topPlaylist(this.cat, this.limit, this.offset).then(res => {
                this.topPlaylist = res.data.playlists
                this.playcount(this.topPlaylist,'playCount')
                this.musicTotal = res.data.total
            })
        },
        //监听选择哪个tags标签
        giveClassName(index){
            const Tags = document.getElementsByClassName('tags')
            for(let i=0; i<Tags.length; i++){
                 Tags[i].className = 'tags'
            }
            Tags[index].className = 'tags red'
            this.cat = Tags[index].innerHTML
            this.getTopPlayList()
        },
        //监听当前页数的变化
        handleCurrentChange(val){
            this.offset = (val - 1)*this.limit
            this.getTopPlayList()
        },
        //跳转到歌单页面
        toSonglist(id){
            this.$router.push(`/songlist/${id}`)
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    color: #FF0000;
}
.musicList{
    padding: 30px 40px 0 40px;

    .tags{
        cursor: pointer;
        margin: 0 10px;
        &:hover{
            color:#FF0000;
        }
    }

    .listBox{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-top: 40px;
        justify-content: space-around;
        .listItem{
            width: 15%;
            padding-bottom: 20px;

            a{
                display: block;
                color: black;
                font-size: 12px;
                position: relative;
                &:hover{
                    color: #C62F2F;
                }   

                .playcount{
                    position: absolute;
                    width: 100%;
                    height: 21px;
                    background: rgba(128, 128, 128, 0.2);
                    i{
                        color: #fff;
                        font-size: 18px;
                        font-weight: 600;
                        margin: 0px 4px;
                    }
                    span{
                        color: #fff;
                        font-size: 15px;
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    box-shadow: grey 0px 0px 2px 2px;
                }
                p{
                    width: 100%;
                    font-size: 16px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}

.el-pagination {
    padding-bottom: 40px;
}
</style>