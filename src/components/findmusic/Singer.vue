<template>
  <div class="singerBox">
      <!-- 语种 -->
      <div class="singerArea">
          <span class="areaMain">语种:</span>
          <span @click="choiceOption1(index)" class="areaItem" v-for="(item,index) in arealist" :key="index">{{item.area}}</span>
      </div>

      <!-- 分类 -->
      <div class="singerType">
          <span class="typeMain">分类:</span>
          <span @click="choiceOption2(index)" class="typeItem" v-for="(item,index) in typelist" :key="index">{{item.type}}</span>
      </div>

      <!-- 渲染歌手列表 -->
      <div class="singerlist">
          <div class="listItem" v-for="(item,index) in singerlist" :key="index">
              <a href="javascript:;" @click="toSinger(item.id)">
                  <img v-lazy="item.img1v1Url +'?param=200y200'"></img>
                  <p>{{item.name}}</p>
              </a>
          </div>
      </div>

      <!-- 分页 -->
      <el-pagination background layout="prev, next" @current-change='handleCurrentChange'>
      </el-pagination>
  </div>
</template>

<script>
export default {
    data(){
        return{
            arealist: [{
                id: -1,
                area: '全部' 
            },{
                id: 7,
                area: '华语'
            },{
                id: 96,
                area: '欧美'
            },{
                id: 8,
                area: '日本'
            },{
                id: 16,
                area: '韩国'
            },{
                id: 0,
                area: '其他'
            }],
            typelist: [{
                id: -1,
                type: '全部'
            },{
                id: 1,
                type: '男歌手'
            },{
                id: 2,
                type: '女歌手'
            },{
                id: 3,
                type: '乐队'
            }],
            limit: 12,
            offset: 0,
            type: -1,
            area: -1,
            singerlist: []
        }
    },
    mounted(){
        this.settingSelected()
        this.getSingerList()
    },
    methods:{
        //获取歌手分类列表
        getSingerList(){
            this.$api.singer(this.limit, this.offset, this.type, this.area).then(res => {
                this.singerlist = res.data.artists
            })
        },
        //设置语种与分类第一个选项
        settingSelected(){
            const area = document.getElementsByClassName('areaItem')
            const type = document.getElementsByClassName('typeItem')
            area[0].className = 'areaItem red'
            type[0].className = 'typeItem red'
        },
        //选择选项
        choiceOption1(index){
            const area = document.getElementsByClassName('areaItem')
            for(let i=0; i<area.length; i++){
                area[i].className = 'areaItem'
            }
            area[index].className = 'areaItem red'
            this.area = this.arealist[index].id
            this.getSingerList()
        },
        choiceOption2(index){
            const type = document.getElementsByClassName('typeItem')
            for(let j=0; j<type.length; j++){
                type[j].className = 'typeItem'
            }
            type[index].className = 'typeItem red'
            this.type = this.typelist[index].id
            this.getSingerList()
        },
        //监听当前页数变化
        handleCurrentChange(val){
            this.offset = (val-1)*this.limit
            this.getSingerList()
        },
        //跳转到歌手详情页
        toSinger(id){
            this.$router.push(`/singer/${id}`)
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    color: #FF0000;
}
.singerBox{
    padding: 35px;
}
.singerArea{
    padding-bottom: 20px;
    .areaMain{
        margin-right: 20px;
    }
    .areaItem{
        cursor: pointer;
        padding: 0px 12px;
    }
}
.singerType{
    padding-bottom: 20px;
    .typeMain{
        margin-right: 20px;
    }
    .typeItem{
        cursor: pointer;
        padding: 0px 12px;
    }
}
// 歌手列表
.singerlist{
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    justify-content: space-around;
    .listItem{
        width: 15%;
        padding-bottom: 20px;
        a{
            display: block;
            text-align: center;
            &:hover p{
                color: #FF0000;
            }
            img{
                width: 100%;
                height: 100%;
                border-radius: 10px;
                box-shadow: grey 0px 0px 2px 2px;
            }
            p{
                color: black;
                padding-top: 7px;
            }
        }
    }
}
</style>