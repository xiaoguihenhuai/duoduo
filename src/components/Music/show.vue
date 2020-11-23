<template>
  <div class="content">
    <div class="main">
      <!-- 卡片视图 -->
      <el-carousel :interval="3000" type="card" height="300px" loop>
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.url" class="pic"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="player">
          <!-- autoplay 自动播放 -->
          <audio :src='musicUrl' controls autoplay></audio>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont el-icon-video-play"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music',
  data () {
    return {
      imgList: [
        {
          id: 1,
          url: 'https://i.gzn.jp/img/2016/05/16/limits-of-humanity/00.jpg'
        },
        {
          id: 2,
          url:
            'https://www.cinra.net/uploads/img/news/2019/20190409-videogirl_full.jpg'
        },
        {
          id: 3,
          url:
            'https://storage.googleapis.com/ttrinity/_img/feature/44/feature_img_full_44.jpg'
        },
        {
          id: 4,
          url:
            'https://img.technews.tw/wp-content/uploads/2017/11/16173121/girl-2848057_960_720-624x367.jpg'
        }
      ],
      songs:[],
      musicUrl:[]
    }
  },
  mounted(){
    this.$http.get('/api/personalized/newsong').then((res)=>{
      //console.log(res)
      this.songs = res.data.result
    })
  },
  methods:{
    playMusic(id){
      this.$http.get('/api/song/url?id='+id).then((res)=>{
        // console.log(res.data.code);
        var ststus = res.data.code
        if(ststus === 200){
          console.log(res.data.data[0].url);
          this.musicUrl = res.data.data[0].url
        }
      })
    }
  }
}
</script>

<style scoped>
.content .main {
  background-image: url('https://pic1.zhimg.com/v2-73f3e954113c4f1601c0483574f44a8d_1440w.jpg?source=172ae18b');
}
.pic {
  border: 1px #2b4b6b solid;
  width: 578px;
  height: 300px;
}
.content .news {
  margin-bottom: 40px;
}

.content .news .player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.content .news audio {
  width: 100%;
  border-radius: 5px;
  outline: none;
}

.content .news .items {
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
}

.content .news .items .item {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
}

.content .news .items .item:hover {
  background-color: #f5f5f5;
}

.content .news .items .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.content .news .items .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.content .news .items .item .img-wrap img {
  width: 80px;
  height: 80px;
}

.content .news .items .item .img-wrap .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #dd6d60;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.content .news .items .item .img-wrap .iconfont::before {
  transform: translateX(3px);
}

.content .news .items .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.content .news .items .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
  font-size: 16px;
}
</style>
