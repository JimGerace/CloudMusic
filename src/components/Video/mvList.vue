<template>
  <div class="mvBox">
      <!-- 地区 -->
      <div class="areaBox">
          <span class="areaFirst">地区:</span>
          <span @click="areaSelected(item.id)" class="areaItem" :style="item.id === optionSelected.areaID?'color:#FF0000': 'color:#000'" v-for="(item,index) in arealist" :key="index">{{item.name}}</span>
      </div>

      <!-- 分类 -->
      <div class="typeBox">
          <span class="typeFirst">分类:</span>
          <span @click="typeSelected(item.id)" class="typeItem" :style="item.id === optionSelected.typeID?'color:#FF0000': 'color:#000'" v-for="(item,index) in typelist" :key="index">{{item.name}}</span>
      </div>

      <!-- 排序 -->
      <div class="orderBox">
          <span class="orderFirst">排序:</span>
          <span @click="orderSelected(item.id)" class="orderItem" :style="item.id === optionSelected.orderID?'color:#FF0000': 'color:#000'" v-for="(item,index) in orderlist" :key="index">{{item.name}}</span>
      </div>

      <!-- mv视频列表 -->
      <div class="mvlistBox">
          <div @click="toMvPage(item.id)" class="mvItem" v-for="(item,index) in mvlist" :key="index">
              <a href="javascript:;">
                  <div class="playcount">
                      <i class="iconfont icon-erji"></i>
                      <span>{{item.playCount}}</span>
                  </div>
                  <img v-lazy="item.cover+'?param=190y107'" >
                  <p>{{item.name}}</p>
              </a>
          </div>
      </div>

      <!-- 分页 -->
      <el-pagination @current-change='handleCurrentChange' background layout="prev, next"></el-pagination>
  </div>
</template>

<script>
export default {
    data(){
        return{
            arealist: [
                {id:-1, name:'全部'},
                {id:7, name:'内地'},
                {id:96, name:'港台'},
                {id:8, name:'欧美'},
                {id:16, name:'日本'},
                {id:0, name:'韩国'}
            ],
            typelist: [
                {id: -1, name: '全部'},
                {id: 1, name: '官方版'},
                {id: 2, name: '原生'},
                {id: 3, name: '现场版'},
                {id: 4, name: '网易出品'}
            ],
            orderlist: [
                {id: 1, name: '上升最快'},
                {id: 2, name: '最热'},
                {id: 3, name: '最新'}
            ],
            order: '上升最快',
            type: '全部',
            area: '全部',
            limit: 12,
            offset: 0,
            mvlist: [],
            optionSelected: {
                orderID: 1,
                typeID: -1,
                areaID: -1
            }
        }
    },
    mounted(){
        this.getMvVideo()
    },
    methods:{
        //地区选择
        areaSelected(id){
            this.optionSelected.areaID = id
            for(let i=0; i<this.arealist.length; i++){
                if(id == this.arealist[i].id){
                    this.area = this.arealist[i].name
                }
            }
            this.getMvVideo()
        },
        //分类选择
        typeSelected(id){
            this.optionSelected.typeID = id
            for(let i=0; i<this.typelist.length; i++){
                if(id == this.typelist[i].id){
                    this.type = this.typelist[i].name
                }
            }
            this.getMvVideo()
        },
        //排序选择
        orderSelected(id){
            this.optionSelected.orderID = id
            for(let i=0; i<this.orderlist.length; i++){
                if(id == this.orderlist[i].id){
                    this.order = this.orderlist[i].name
                }
            }
            this.getMvVideo()
        },
        //获取mv视频
        getMvVideo(){
            this.$api.mvVideo(this.order, this.type, this.area, this.limit, this.offset).then(res => {
                this.mvlist = res.data.data
                this.playcount(this.mvlist, 'playCount')
            })
        },
        //监听当前页数的变化
        handleCurrentChange(val){
            this.offset = (val-1)*this.limit
            this.getMvVideo()
        },
        //跳转到mv详情页
        toMvPage(id){
            this.$emit('closedFooter')
            this.$router.push(`/mv/${id}`)
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    color: #FF0000;
}
.mvBox{
    padding: 30px;
}
.areaBox{
    margin-bottom: 20px;
    .areaItem{
        cursor: pointer;
        padding-left: 25px;
    }
}
.typeBox{
    margin-bottom: 20px;
    .typeItem{
        cursor: pointer;
        padding-left: 25px;
    }
}
.orderBox{
    .orderItem{
        cursor: pointer;
        padding-left: 25px;
    }
}

.mvlistBox{
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: space-around;
    .mvItem{
        width: 15%;
        padding: 20px 0px;
        a{
            position: relative;
            display: block;
            width: 100%;
            color: #000;
            &:hover p{
                color: #FF0000;
            }
            .playcount{
                position: absolute;
                width: 100%;
                height: 21px;
                color: #fff;
                background: rgba(128, 128, 128, 0.2);
                i{
                    margin-left: 5px;
                    font-size: 18px;
                    font-weight: 600;
                }
                span{
                    margin-left: 3px;
                }
            }   
            img{
                width: 100%;
                height: 107px;
                border-radius: 10px;
                box-shadow: grey 0px 0px 2px 2px;
            }
            p{
                font-size: 14px;
                overflow: hidden;
                margin-top: 5px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}

.el-pagination{
    padding-bottom: 10px;
}
</style>