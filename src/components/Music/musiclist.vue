<template>
  <div>
   <el-row>
          <el-col
            :span="4"
            v-for="item in songsList"
            :key="item.id"
            :offset="1"
            style="margin-left: 1%; margin-right: 1%"
          >
            <el-card :body-style="{ padding: '0px' }" style="margin-top: 15px" shadow="hover">
              <img :src="item.coverImgUrl" class="image" />
              <span @click="playMusic(item.id)" class="iconfont el-icon-video-play"></span>
              <div style="padding: 14px">
                <span>{{ item.tags[0] }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total, prev, pager, next"
      :total="totalPages">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'musiclist',
  data() {
    return {
      activeName: '全部',
      topShowPicUrl: '',
      songsList: [],
      totalPages:1,
      currentPage:1,
    }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`);

        this.$http({
      url: '/api/top/playlist',
      method: 'get',
      params: {
        limit: 15,
        offset: (this.currentPage-1)*15,
        cat: '全部',
      },
    }).then((res) => {
      console.log(res.data)
      this.songsList = res.data.playlists
      this.totalPages = res.data.total
      
    })
      },
      

  },
  mounted() {
    //全部的歌单
    this.$http({
      url: '/api/top/playlist/highquality',
      method: 'get',
      params: {
        limit: 15,
        offset: (this.currentPage-1)*15,
        cat: '全部',
      },
    }).then((res) => {
      console.log(res.data)
      this.songsList = res.data.playlists
      this.totalPages = res.data.total
      
    })
  },
}
</script>

<style scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
