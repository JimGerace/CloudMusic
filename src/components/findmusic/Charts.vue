<template>
  <div class="Charts">
      <!-- 官方榜 -->
      <div class="officialCharts">
          <div class="officialTitle">
              <h1>官方榜</h1>
          </div>
          <div class="officialList">
              <div class="listItem" v-for="(item,index) in chartslist" :key='index'>
                  <a href="javascript:;" @click="toSongList(item.id)">
                      <img v-lazy="item.coverImgUrl+'?param=200y200'"></img>
                  </a>
                  <div class="itemContent" v-for="(option,index) in item.tracks" :key="index">
                    <span class="index">{{index+1}}</span>
                    <label class="musicName">{{option.first}}</label>
                    <span class="musicArtist">{{option.second}}</span>
                  </div>
              </div>
          </div>
      </div>

      <!-- 全球榜 -->
      <div class="globalCharts">
          <div class="globalTitle">
              <h1>全球榜</h1>
          </div>
          <div class="globalList">
              <div class="globalItem" v-for="(item,index) in globallist" :key="index">
                  <a href="javascript:;" @click="toSongList(item.id)">
                      <div class="playcount">
                          <i class="iconfont icon-erji"></i>
                          <span>{{item.playCount}}</span>
                      </div>
                      <img v-lazy="item.coverImgUrl+'?param=200y200'"></img>
                      <p>{{item.name}}</p>
                  </a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            chartslist: [],
            globallist: []
        }
    },
    mounted(){
        this.getChartsData()
    },
    methods:{
        //获取榜单所有数据
        getChartsData(){
            this.$api.charts().then(res => {
                for(let i=0; i<res.data.list.length; i++){
                    if(res.data.list[i].tracks.length !== 0){
                        this.chartslist.push(res.data.list[i])
                    }else{
                        this.globallist.push(res.data.list[i])
                    }
                }
                // 处理播放数量
                this.playcount(this.globallist,'playCount')
            })
        },
        //跳转到歌单页
        toSongList(id){
            this.$router.push(`/songlist/${id}`)
        }
    }
}
</script>

<style lang='less' scoped>
.Charts{
    padding: 30px 40px;
}
.officialCharts{
    .officialTitle{
        border-bottom: 2px solid #eee;
        h1{
            font-size: 24px;
            font-weight: 500;
            padding-bottom: 10px;
        }
    }
    .officialList{
        display: flex;
        flex-wrap: wrap;
        padding-top: 20px;
        text-align: center;
        .listItem{
            overflow: auto;
            width: 50%;
            height: 420px;
            a{
                img{
                    width: 307px;
                    height: 200px;
                    border-radius: 20px;
                }
            }
        }
        .itemContent{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px 0px;
            &:hover{
                background-color: #F5F7FA;
            }
            .index{
                color: #FF0000;
            }
            .musicName{
                padding: 0px 15px;
            }
            .musicArtist{
                color: #0984e3;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
// 全球榜
.globalCharts{
    .globalTitle{
        border-bottom: 2px solid #eee;
        h1{
            font-size: 24px;
            font-weight: 500;
            padding-bottom: 10px;
        }
    }
    .globalList{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-top: 20px;
        .globalItem{
            width: 15%;
            padding-top: 10px;
            &:hover p{
                color: #FF0000;
            }
            a{
                display: block;
                position: relative;
                .playcount{
                    position: absolute;
                    color: #fff;
                    width: 100%;
                    height: 21px;
                    background: rgba(128, 128, 128, 0.2);
                    i{
                        position: absolute;
                        left: 10px;
                        font-size: 20px;
                        font-weight: 600;
                    }
                    span{
                        position: absolute;
                        left: 32px;
                    }
                }
                text-align: center;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    margin-bottom: 5px;
                    box-shadow: grey 0px 0px 2px 2px;
                }
                p{
                    overflow: hidden;
                    width: 100%;
                    color: black;
                    padding-bottom: 15px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>