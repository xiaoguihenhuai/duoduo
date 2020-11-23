<template>
  <div>
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片式图 -->
    <el-card class="box-card">
        <!-- 表格 -->
      <el-table :data="tableData" stripe border lazy>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="商品介绍">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="name"> </el-table-column>
        <el-table-column prop="address" label="address"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          desc: '荷兰优质淡奶，奶香浓而不腻'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          desc: '荷兰优质淡奶，奶香浓而不腻'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          desc: '荷兰优质淡奶，奶香浓而不腻'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          desc: '荷兰优质淡奶，奶香浓而不腻'
        }
      ]
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    getUsersList () {
      this.$http.get('')
    }
  }
}
</script>

<style scoped>
</style>
