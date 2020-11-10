<template>
  <div class="songDetailBox">
      <!-- 顶部 -->
      <div class="songTop">
          <img class="backpic" :src="backImg">
          <!-- 左端 -->
          <div class="Top-left">
              <!-- 封面 -->
              <div class="coverPic">
                <img class="ACD play" src="../../assets/img/disc.png">
                <img class="musicPic" :src="backImg">
              </div>
              <!-- 按钮 -->
              <div class="btnBox">
                  <el-button icon="iconfont icon-aixin" size="mini"> 喜欢</el-button>
                  <el-button icon="el-icon-folder-add" size="mini">收藏</el-button>
                  <el-button icon="el-icon-download" size="mini">VIP下载</el-button>
                  <el-button icon="iconfont icon-fenxiang" size="mini"> 分享</el-button>
              </div>
          </div>

          <!-- 右端 -->
          <div class="Top-right">
              <!-- 标题框 -->
              <div class="TitleBox">
                <!-- 歌名 -->
                <h1 class="musicname">{{songDetail.name}}</h1>
                <div class="artistInfo">
                    <!-- 专辑 -->
                    <div class="albumBox">
                        <span>专辑: </span>
                        <label @click="toAlbumPage(songDetail.al.id)" v-if="songDetail.al">{{songDetail.al.name}}</label>
                    </div>
                    <!-- 歌手 -->
                    <div class="singerBox">
                        <span >歌手: </span>
                        <div v-if="songDetail.ar">
                            <label @click="toSingerPage(songDetail.ar[0].id)" v-if="songDetail.ar.length == 1">{{songDetail.ar[0].name}}</label>
                            <div class="manyArtist" v-if="songDetail.ar.length == 2">
                                <label @click="toSingerPage(songDetail.ar[0].id)">{{songDetail.ar[0].name}} </label>
                                <label @click="toSingerPage(songDetail.ar[1].id)">{{songDetail.ar[1].name}} </label>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

              <!-- 歌词框 -->
              <div class="lyricBox">
                <ul class="lyrics" ref="lyricScroll" style="transform: scrollTop 0.5s">
                    <li class="lyricItem" 
                    :style="{color: lyricIndex == index ? 'white' : 'black'}" 
                    :ref="lyricIndex == index? 'lyricRef' : '' "
                    v-for="(item,index) in lyricsObject"
                    :key="index">{{item.c}}</li>
                </ul>    
              </div>

          </div>
      </div>

      <!-- 底部 -->
      <div class="songFooter">
          <!-- 评论区域 -->
          <div class="songCommentBox">
              <!-- 标题 -->
              <div class="title">
                  听友评论
                  <span class="miniTitle">(已有{{total}}条评论)</span>
              </div>
              
              <!-- 富文本区域 -->
              <div class="textareaBox">
                  <i class="num">140</i>
                  <el-input class="textarea" ref="textareaRef" v-model="content" type="textarea" maxlength="140" resize="none"></el-input>
                  <el-button size="mini" @click="sendComment">评论</el-button>
              </div>

              <!-- 精彩评论 -->
              <div class="hotCommentBox" v-if="offset == 0">
                  <!-- 标题 -->
                  <div class="hotTitle">精彩评论</div>

                  <!-- 评论正文 -->
                  <div class="hotCommentItem" v-for="(item,index) in hotComments" :key="index">
                      <!-- 用户头像 -->
                      <img v-lazy="item.user.avatarUrl">
                      <!-- 评论内容 -->
                      <div class="commentContent">
                          <!-- 用户评论 -->
                          <div class="userContent">
                              <span class="username">{{item.user.nickname}}: </span>
                              <span class="content">{{item.content}}</span>
                          </div>

                          <!-- 回复评论 -->
                          <div class="resContent" v-if="item.beReplied != false">
                              <span class="resname">@{{item.beReplied[0].user.nickname}}: </span>
                              <span class="rescontent">{{item.beReplied[0].content}}</span>
                          </div>

                          <!-- 评论时间 -->
                          <div class="creatTime">
                              <div class="time">{{item.time | Form('yy-mm-dd-hh-mm-ss')}}</div>
                              <div class="shareBox">
                                  <div v-if="item.liked" class="commentRed">
                                      <i @click="toLike(item)" class="iconfont icon-dianzan"></i>
                                      <label>({{item.likedCount}})</label>
                                  </div>
                                  <div v-else>
                                      <i @click="toLike(item)" class="iconfont icon-dianzan"></i>
                                      <label>({{item.likedCount}})</label>
                                  </div>
                                  <div>分享</div>
                                  <div @click="toResponse(item.commentId)">回复</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- 最新评论 -->
              <div class="hotCommentBox">
                  <!-- 标题 -->
                  <div class="hotTitle">最新评论</div>

                  <!-- 评论正文 -->
                  <div class="hotCommentItem" v-for="(item,index) in comments" :key="index">
                      <!-- 用户头像 -->
                      <img v-lazy="item.user.avatarUrl+'?param=100y100'">
                      <!-- 评论内容 -->
                      <div class="commentContent">
                          <!-- 用户评论 -->
                          <div class="userContent">
                              <span class="username">{{item.user.nickname}}: </span>
                              <span class="content">{{item.content}}</span>
                          </div>

                          <!-- 回复评论 -->
                          <div class="resContent" v-if="item.beReplied != false">
                              <span class="resname">@{{item.beReplied[0].user.nickname}}: </span>
                              <span class="rescontent">{{item.beReplied[0].content}}</span>
                          </div>

                          <!-- 评论时间 -->
                          <div class="creatTime">
                              <div class="time">{{item.time | Form('yy-mm-dd-hh-mm-ss')}}</div>
                              <div class="shareBox">
                                  <div v-if="item.liked" class="commentRed">
                                      <i @click="toLike(item)" class="iconfont icon-dianzan"></i>
                                      <label>({{item.likedCount}})</label>
                                  </div>
                                  <div v-else>
                                      <i @click="toLike(item)" class="iconfont icon-dianzan"></i>
                                      <label>({{item.likedCount}})</label>
                                  </div>
                                  <div>分享</div>
                                  <div @click="toResponse(item.commentId)">回复</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- 分页 -->
              <el-pagination background @current-change='handleCurrentChange' layout="prev, pager, next" :page-size='limit' :total="total">
              </el-pagination>

          </div>

          <!-- 相似歌曲区域 -->
          <div class="simiSongBox">
              <!-- 标题 -->
              <span class="title">相似歌曲</span>
              
              <!-- 歌曲 --> 
              <div class="SongItem" @click="changeMusic(item.id)" v-for="(item,index) in simiSong" :key="index">
                  <!-- 歌曲封面 -->
                  <img v-lazy="item.album.blurPicUrl+'?param=100y100'">
                  <!-- 歌曲信息 -->
                  <div class="songInfo">
                      <span class="musicname">{{item.name}}</span>
                      <span class="artist">{{item.artists[0].name}}</span>
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
            id: this.$route.params.id,
            //歌曲背景图
            backImg: '',
            // 歌曲详细信息
            songDetail: [],
            // 歌词
            lyrics: '',
            //歌词数组
            lyricsObject: [],
            //歌词索引
            lyricIndex: 0,
            //时长
            duration: 0,
            // 发送评论的信息
            limit: 20,
            offset: 0,
            //热门评论
            hotComments: [],
            //最新评论
            comments: [],
            //评论总数
            total: 0,
            //发送评论/回复评论数据
            t: 1,
            type: 0,
            content: '',
            commentId: null,
            //点赞或取消点赞数据
            cid: null,
            lt: 1,
            //相似歌曲信息
            simiSong: []
        }
    },
    mounted(){
        this.initialzation()
    },
    updated(){
        this.handleEditorNum()
    },
    methods:{
        //切换歌曲
        changeMusic(id){
            this.changeCurId(id)
            this.$emit('openSong')
            this.$router.push(`/songdetail/${id}`)
        },
        //获取相似歌曲
        getSimiSong(){
            this.$api.simiSong(this.id).then(res => {
                this.simiSong = res.data.songs
            })
        },
        //点赞或取消点赞
        toLike(item){
            this.cid = item.commentId
            if(item.liked){
                this.lt = 0
            }else{
                this.lt = 1
            }
            this.$api.support(this.id, this.cid, this.lt, this.type).then(res => {
                this.lt = 1
                this.cid = null
                if(this.lt == 1){
                    this.$message.success('点赞成功')
                }else{
                    this.$message.success('取消点赞成功')
                }
                this.getSongComment()
            })
        },
        //点击回复然后获取回复id
        toResponse(id){
            this.commentId = id
            this.t = 2
            this.$refs.textareaRef.focus()
        },
        //发送评论
        sendComment(){
            if(this.content.length == 0){
                return this.$message.error('请输入内容');
            }
            this.$api.sendComment(this.id, this.t, this.type, this.content, this.commentId).then(res => {
                this.content = ''
                this.t = 1
                this.commentId = null
                this.getSongComment()
                this.$message.success('发送成功')
            })
        },
        //获取歌曲评论
        getSongComment(){
            this.$api.songComment(this.id, this.limit, this.offset).then(res => {
                this.hotComments = res.data.hotComments
                this.comments = res.data.comments
                this.total = res.data.total
            })
        },
        // 获取歌曲详情
        getSongDetail(){
            this.$api.songDetail(this.id).then(res => {
                this.backImg = res.data.songs[0].al.picUrl
                this.songDetail = res.data.songs[0]
            })
        },
        //获取歌曲歌词
        getLyric(){
            this.$api.lyric(this.id).then(res => {
                this.lyrics = res.data.lrc.lyric
                this.creatLyricObject(this.lyrics)
            })
        },
        //解析歌词
        creatLyricObject(lyr){
            //创建变量存储
            let lyrs = {
                ms: []
            }
            //判断是否是纯音乐
            if(lyr == false) return
            //将字符串转换为数组
            lyr = lyr.split('\n')
            //遍历数组
            for(var i in lyr){
                //清除前后空格
                lyr[i] = lyr[i].replace(/^(\s)|(\s)$/g, '')
                //提取开头[00:00:00]这时间段
                let arr = lyr[i].match(/\[\d+:+\d+.+\d+\]/g)
                //记录时间段长度
                let start = 0
                for(var j in arr){
                    start = arr[j].length
                    //将时间段[]里面的数字换成毫秒
                    var time = arr[j].substring(1, start-1)
                    var num = time.split(':')
                    var count = (parseFloat(num[0])*60 + parseFloat(num[1])).toFixed(3)
                }
                //提取歌词内容
                let content = lyr[i].substring(start)

                lyrs.ms.push({
                    t: count,
                    c: content == '' ? '............' : content
                })
            }
            //排序
            lyrs.ms.sort((a,b) => {
                return a.t - b.t
            })

            this.lyricsObject = lyrs.ms
        },
        //处理富文本输入字数
        handleEditorNum(){
            const num = document.getElementsByClassName('num')[0]
            const textarea = document.getElementsByClassName('textarea')[0]
            num.innerHTML = 140 - this.content.length
            textarea.onkeypress = () => {
                if(num.innerHTML == 0){
                    return
                }
                num.innerHTML--
            }
        },
        //当前页数改变
        handleCurrentChange(val){
            this.offset = (val-1)*this.limit
            this.getSongComment()
        },
        //初始化
        initialzation(){
            this.getSongDetail()
            this.getLyric()
            this.getSongComment()
            this.getSimiSong()
        },
        //跳转到专辑页面
        toAlbumPage(id){
            this.$router.push(`/album/${id}`)
        },
        //跳转到歌手页面
        toSingerPage(id){
            this.$router.push(`/singer/${id}`)
        },
        ...mapMutations({
            changeCurId: 'PUT_CURID'
        })
    },
    watch: {
        '$store.state.musicDuration'(){
            this.duration = this.$store.state.musicDuration
            for(let i=0; i<this.lyricsObject.length; i++){
                if(this.duration <= parseFloat(this.lyricsObject[i].t)){
                    if(this.lyricIndex == i - 1){
                        break
                    }

                    this.lyricIndex = i - 1

                    if(this.$refs.lyricRef[0]){
                        if (this.$refs.lyricScroll.scrollTop + 55 > this.$refs.lyricRef[0].offsetTop) {
                            // console.log("不自动滑动");
                        } else {
                            if (this.$refs.lyricRef[0].offsetTop > 175) {
                                this.$refs.lyricScroll.scrollTop = this.$refs.lyricRef[0].offsetTop - 175
                            }
                        }
                    }
                    //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
                    if (this.lyricIndex === this.lyricsObject.length - 1) {
                        this.lyricIndex = 0
                    }
                    break
                }
            }
        },
        //监视播放状态
        '$store.state.iconShow'(){
            const Acd = document.getElementsByClassName('ACD')[0]
            if(this.$store.state.iconShow){
                Acd.className = 'ACD play'
            }else{
                Acd.className = 'ACD play pause'
            }
        },
        //歌曲的变化
        '$store.state.curId'(){
            this.id = this.$store.state.curId
            this.offset = 0
            this.lyricsObject = []
            this.lyricIndex = 0
            this.duration = 0
            this.initialzation()
        },
        //路由变化
        $route(){
            this.id = this.$route.params.id
            this.offset = 0
            this.lyricsObject = []
            this.lyricIndex = 0
            this.duration = 0
            this.initialzation()
        }
    }
}
</script>

<style lang='less' scoped>
.songDetailBox{

    // 顶部
    .songTop{
        position: relative;
        width: 100%;
        height: 450px;
        display: flex;
        .backpic{
            position: absolute;
            left: 8%;
            border-radius: 60%;
            width: 80%;
            height: 90%;
            filter: blur(100px);
        }

        .Top-left{
            z-index: 100;
            width: 40%;
            display: flex;
            flex-direction: column;
            margin-left: 11.5%;
            .coverPic{
                position: relative;
                width: 280px;
                height: 280px;
                margin-left: 25px;
                .ACD{
                    position: absolute;
                    width: 280px;
                    height: 280px;
                    -webkit-transform-origin: center center;
                    -ms-transform-origin: center center;
                    transform-origin: center center;
                }
                .musicPic{
                    position: absolute;
                    left: 61px;
                    top: 61px;
                    width: 160px;
                    height: 160px;
                    border-radius: 50%;
                }

            }

            .btnBox{
                margin-top: 100px;
                .el-button{
                    background-color: #E3E3E5;
                }
            }
        }

        .Top-right{
            z-index: 100;
            width: 45%;
            display: flex;
            flex-direction: column;
            margin-left: 3.5%;

            .TitleBox{
                display: flex;
                flex-direction: column;

                h1{
                    font-size: 22px;
                    font-weight: normal;
                    margin-bottom: 10px;
                }

                .artistInfo{
                    display: flex;

                    .albumBox{
                        display: flex;
                        font-size: 14px;
                        margin-right: 15px;

                        label{
                            cursor: pointer;
                            color: #2A5AA3;
                            margin-left: 5px;
                        }
                    }

                    .singerBox{
                        display: flex;
                        font-size: 14px;
                        label{
                            cursor: pointer;
                            color: #2A5AA3;
                            margin-left: 5px;
                        }
                        .manyArtist{
                            display: flex;
                        }
                    }
                }
            }

            .lyricBox{
                overflow: hidden;
                width: 420px;
                height: 350px;
                margin-top: 10px;
                .lyrics{
                    overflow: auto;
                    width: 450px;
                    height: 100%;

                    .lyricItem{
                        padding: 10px 0px;
                    }
                }
            }
        }
    }

    // 底部
    .songFooter{
        z-index: 102;
        overflow: hidden;
        display: flex;
        margin-left: 11.5%;

        .songCommentBox{
            display: flex;
            flex-direction: column;
            width: 550px;

            .title{
                font-size: 20px;
                color: #666;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
               
               .miniTitle{
                font-size: 12px;
                color: #999;
                }
            }

            .textareaBox{
                position: relative;
                margin-top: 15px;
                background-color: #F0F0F2;
                padding: 10px 20px 40px 20px;

                i{
                    z-index: 10;
                    position: absolute;
                    right: 40px;
                    bottom: 45px;
                    color: #999;
                }

                .el-button{
                    position: absolute;
                    right: 20px;
                    bottom: 5px;
                }
                
            }

            .hotCommentBox{
                margin-top: 20px;

                .hotTitle{
                    color: #666;
                    font-size: 14px;
                    padding-bottom: 5px;
                }

                .hotCommentItem{
                    display: flex;
                    padding: 10px 0px;
                    border-top: 1px solid #eee;
                    img{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        margin-right: 15px;
                    }
                    .commentContent{
                        width: 100%;
                        display: flex;
                        flex-direction: column;

                        .userContent{
                            font-size: 13px;
                            .username{
                                color: #1C7CC6;
                            }
                        }

                        .resContent{
                            padding: 5px;
                            font-size: 13px;
                            margin-top: 5px;
                            background-color: #F0F0F2;
                            .resname{
                                color: #1C7CC6;
                            }
                        }

                        .creatTime{
                            font-size: 12px;
                            display: flex;
                            justify-content: space-between;
                            padding-top: 5px;
                            .time{
                                color: #999;
                            }

                            .shareBox{
                                display: flex;
                                align-items: center;
                                color: #999;
                                div{
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
                                    margin-right: 15px;
                                }
                            }
                        }
                    }
                }
            }
        }

        // 相似歌曲
        .simiSongBox{
            display: flex;
            flex-direction: column;
            width: 250px;
            margin: 5px 0px 0px 10%;

            .title{
                font-size: 20px;
                padding-bottom: 5px;
                border-bottom: 1px solid #eee;
            }

            .SongItem{
                cursor: pointer;
                display: flex;
                margin: 5px 0px;
                &:hover{
                    color: #C62F2F;
                }

                img{
                    width: 40px;
                    height: 40px;
                }
                .songInfo{
                    font-size: 13px;
                    display: flex;
                    flex-direction: column;
                    margin-left: 5px;
                    .musicname{
                        margin-bottom: 5px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .artist{
                        color: #999;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        
    }
}

.el-pagination{
    text-align: center;
    padding: 10px 0px 50px 0px;
}

.commentRed{
    color: #C62F2F;
}

@keyframes acd {
    0%{
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100%{
      transform: rotate(-360deg);
      -ms-transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
}

.play{
    animation: acd 4s infinite linear ;
}
.pause{
    animation-play-state: paused;
}
</style>