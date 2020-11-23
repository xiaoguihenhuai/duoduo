<template>
<div>
    <el-button type="primary" icon="el-icon-star-off" circle @click="run">开始奔跑</el-button>
    <el-card>
        <el-progress type="circle" :percentage="percentage" class='progress-a'></el-progress>
        <el-progress type="circle" :percentage="percentagea" class='progress-a'></el-progress>
        <el-progress type="circle" :percentage="percentageb" class='progress-a'></el-progress>
        <el-progress type="circle" :percentage="percentagec" class='progress-a'></el-progress>
        <el-progress type="circle" :percentage="percentaged" class='progress-a'></el-progress>
        <el-progress type="circle" :percentage="percentagee" class='progress-a'></el-progress>
    </el-card>
</div>
</template>

<script>
export default {
  name: 'goodsStock',
  data () {
    return {
      percentage: 10,
      percentagea: 20,
      percentageb: 30,
      percentagec: 40,
      percentaged: 50,
      percentagee: 60

    }
  },
  methods: {
    run () {
      var i = 1
      clearTimeout(this.timer)
      this.percentage = this.percentage + 1
      this.timer = setInterval(() => {
        this.percentage += i
        this.percentagea += i
        this.percentageb += i
        this.percentagec += i
        this.percentaged += i
        this.percentagee += i
        if (this.percentage > 100 ||
                  this.percentagea > 100 ||
                  this.percentageb > 100 ||
                  this.percentagec > 100 ||
                  this.percentaged > 100 ||
                  this.percentagee > 100) {
          this.percentage = 100
          this.percentagea = 100
          this.percentageb = 100
          this.percentagec = 100
          this.percentaged = 100
          this.percentagee = 100
        }
      }, 50)
    }
  }
}
</script>

<style scoped>
.el-progress{
    margin-right: 10px;
}
.progress-a{

    border-radius:50%;
}
</style>
