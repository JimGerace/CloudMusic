<template>
  <div class="newMusicBox">
      <!-- 标签页 -->
      <div class="tags">
          <span class="tagsFirst">语种:</span>
          <span class="tagsItem" @click="tagsSelected(index)" v-for="(item,index) in newMusicTag" :key="index">{{item.name}}</span>
      </div>

      <!-- 最新歌曲 -->
      <ul class="musicBox">
          <li class="musicItem" v-for="(item,index) in musiclist" :key="index">
              <span class="index">{{index < 9 ? '0'+(index+1): index+1}}</span>
              <a href="javascript:;" @dblclick="selectedMusic(item.id)">
                  <img v-lazy="item.album.blurPicUrl+'?param=200y200'"></img>
              </a>
              <div class="musicDetail">
                  <span class="musicName">{{item.album.name}}</span>
                  <p class="artists">{{item.artists[0].name}}</p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return{
            newMusicTag: [{
                type: 0,
                name: '全部'
            },{
                type: 7,
                name: '华语'
            },{
                type: 96,
                name: '欧美'
            },{
                type: 8,
                name: '日本'
            },{
                type: 16,
                name: '韩国'
            }],
            type: 0,
            musiclist: [],
            //右底部列表id
            listId: []
        }
    },
    mounted(){
        this.settingTags()
        this.getNewMusicList()
    },
    methods:{
        //播放该歌曲
        selectedMusic(id){
            this.changeCurId(id)
            this.changeCurrentPlaylist(this.musiclist)
            this.changeListId(this.listId)
            this.$emit('openSong')
        },
        //设置标签页第一个选项
        settingTags(){
            const tagsBtn = document.getElementsByClassName('tagsItem')
            tagsBtn[0].className = 'tagsItem red'
        },
        //监听标签页的点击
        tagsSelected(index){
            const tagsBtn = document.getElementsByClassName('tagsItem')
            for(let i=0; i<tagsBtn.length; i++){
                tagsBtn[i].className = 'tagsItem'
            }
            tagsBtn[index].className = 'tagsItem red'
            this.queryInfo.type = this.newMusicTag[index].type
            this.getNewMusicList()
        },
        //获取最新音乐列表
        getNewMusicList(){
            this.$api.topMusic(this.type).then(res => {
                this.handleSongNum(res.data.data)
            })
        },
        //限制歌曲数量
        handleSongNum(list){
            this.listId = []
            this.musiclist = []
            for(let i=0; i<20; i++){
                this.musiclist.push(list[i])
                this.listId.push(list[i].id)
            }
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
.red{
    color:#FF0000;
}
.newMusicBox{
    padding: 40px 30px;
}
.tagsFirst{
    padding-right: 20px;
}
.tagsItem{
    cursor: pointer;
    padding-right: 20px;
}

// 最新歌曲
.musicBox{
    display: flex;
    padding: 30px 0px;
    align-items: center;
    flex-direction: column;
    .musicItem{
        display: flex;
        width: 976px;
        height: 81px;
        align-items: center;
        padding: 20px 0px;
        &:hover{
            background-color: #F5F7FA;
        }
        .index{
            color: #747d8c;
            margin-right: 30px;
        }
        a{
            margin-right: 30px;
            img{
                width: 75px;
                height: 75px;
            }
        }
        .musicDetail{
            .musicName{
                color: #8395a7;
                font-size: 18px;
            }
            .artists{
                color: #54a0ff;
                margin-top: 5px;
                font-size: 13px;
            }
        }
    }
}
</style>