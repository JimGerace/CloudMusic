<template>
  <div class="singerTitle">
  <div class="singerBox">
      <!-- 左端 -->
      <div class="box-left">
          <!-- 图片 -->
          <img v-lazy="singerInfo.img1v1Url+'?param=200y200'">

          <!-- 详细信息 -->
          <div class="detailInfo">
              <!-- 上端 -->
              <div class="singerInfo">
                  <span class="singerTag">歌手</span>
                  <div class="nameBox">
                    <span class="Cname">{{singerInfo.name}}</span>
                    <span class="Ename" v-if="singerInfo.alias != false">{{singerEName}}</span>
                  </div>
              </div>

              <!-- 下端 -->
              <div class="songInfo">
                  <!-- 单曲数 -->
                  <div class="musicNumBox">
                      <i class="iconfont icon-yinle"> 单曲数: </i>
                      <label>{{singerInfo.musicSize}}</label>
                  </div>
                  <!-- 专辑数 -->
                  <div class="AlbumNumBox">
                      <i class="iconfont icon-zhuanji"> 专辑数: </i>
                      <label>{{singerInfo.albumSize}}</label>
                  </div>
                  <!-- MV数 -->
                  <div class="MvNumBox">
                      <i class="iconfont icon-shipin"> MV数: </i>
                      <label>{{singerInfo.mvSize}}</label>
                  </div>
              </div>
          </div>
      </div>

      <!-- 右端 -->
      <div class="box-right">
          <el-button icon="el-icon-folder-add" size="mini">收藏</el-button>
      </div>
  </div>

  <!-- Tab标签页 -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="专辑" name="album">
        <!-- 专辑 -->
        <singer-album :albumNum='albumNum'></singer-album>
    </el-tab-pane>
    <el-tab-pane label="MV" name="mv">
        <!-- MV -->
        <singer-mv @closedFooter='closedFooter'></singer-mv>
    </el-tab-pane>
    <el-tab-pane label="相似歌手" name="resembleSinger">
        <!-- 相似歌手 -->
        <resemble-singer @toResemble='toResemble($event)'></resemble-singer>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
const singerAlbum = () => import('./singerAlbum')
const singerMv = () => import('./singerMV')
const resembleSinger = () => import('./resembleSinger')
export default {
    data () {
        return {
            singerID: this.$route.params.id,
            singerInfo: {},
            singerEName: '',
            activeName: 'album',
            albumNum: 0
        }
    },
    methods: {
        //获取歌手信息
        getSingerInfo(){
            this.$api.singerDetail(this.singerID).then(res => {
                this.singerInfo = res.data.artist
                this.albumNum = this.singerInfo.albumSize
                if(this.singerInfo.alias.length != 0){
                    this.singerEName = this.singerInfo.alias[0]
                }
            })
        },
        //跳转歌手详情页
        toResemble(id){
            this.$router.push(`/singer/${id}`)
        },
        //关闭底部进度条
        closedFooter(){
            this.$emit('closedFooter')
        }
    },
    mounted(){
        this.getSingerInfo()
    },
    watch: {
        $route(){
            this.activeName = 'album'
            this.singerID = this.$route.params.id
            this.getSingerInfo()
        }
    },
    components: {
        singerAlbum,
        singerMv,
        resembleSinger
    }
}
</script>

<style lang='less' scoped>
.singerBox{
    display: flex;
    justify-content: space-between;
}
.box-left{
    display: flex;
    img{
        width: 200px;
        height: 200px;
        margin-right: 30px;
    }

    .detailInfo{
        display: flex;
        flex-direction: column;

        .singerInfo{
            display: flex;
            .singerTag{
                width: 40px;
                height: 24px;
                color: #fff;
                line-height: 24px;
                text-align: center;
                margin-top: 5px;
                background-color: #C62F2F;
                border-color: #C62F2F;
            }
            .nameBox{
                display: flex;
                margin-left: 10px;
                flex-direction: column;
                .Cname{
                    color: #000;
                    font-size: 24px;
                }
                .Ename{
                    color: #718093;
                    font-size: 14px;
                }
            }
        }

        .songInfo{
            margin-top: 30px;
            .musicNumBox{
                margin-bottom: 10px;
            }
            .AlbumNumBox{
                margin-bottom: 10px;
            }
            label{
                color: #7f8fa6;
            }
        }
    }
}

.el-tabs{
    padding-top: 20px;
}
</style>