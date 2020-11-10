import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/home'},
  {path: '/home',
   component: resolve => require(['../components/Home.vue'], resolve),
   children: [
    {path: '/home', redirect: '/findMusic'},
    {path: '/findMusic',
     component: resolve => require(['../components/findmusic/FindMusic.vue'], resolve)},

    {path: '/video',
     component: resolve => require(['../components/Video/video.vue'], resolve)},

    {path: '/myMusic',
     component: resolve => require(['../components/myMusicBox/myMusicBox.vue'], resolve)},
     
    {path: '/songlist/:id',
     component: resolve => require(['../components/songlist/songTitle.vue'], resolve)} ,

    {path: '/singer/:id',
     component: resolve => require(['../components/singer/singerTitle.vue'], resolve)},

    {path: '/album/:id',
     component: resolve => require(['../components/album/albumTitle.vue'], resolve)},

    {path: '/mv/:id',
     component: resolve => require(['../components/mv/mvTitle.vue'], resolve)},

    {path: '/video/:id',
     component: resolve => require(['../components/Video/videoPage.vue'], resolve)},

     {path: '/search/:data',
      component: resolve => require(['../components/search/searchTitle.vue'], resolve)},

     {path: '/songdetail/:id',
      component: resolve => require(['../components/songDetail/Index.vue'], resolve)} 
  ]}
]

const router = new VueRouter({
  routes,
})

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
