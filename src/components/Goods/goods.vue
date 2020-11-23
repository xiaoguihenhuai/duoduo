<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="dialogVisible = true"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格显示 -->
      <el-table :data="goodsList" border stripe lazy>
        <el-table-column type="index" label="No."> </el-table-column>
        <el-table-column label="地名" prop="name"> </el-table-column>
        <el-table-column label="平仮名" prop="name_h"> </el-table-column>
        <el-table-column label="エリア" prop="area"> </el-table-column>
        <el-table-column label="状態">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="statusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 編集btn -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editBtn(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteGoodsInfo(scope.$index, scope.row)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="角色分配"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-star-off"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 編集ポップアップ -->
      <el-dialog
        title="編集商品情報"
        :visible.sync="editDialogVisible"
        width="30%"
        @close="editDialogClose"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editForm"
          label-width="80px"
        >
          <el-form-item label="地名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="平仮名" prop="name_h">
            <el-input v-model="editForm.name_h"></el-input>
          </el-form-item>
          <el-form-item label="エリア" prop="area">
            <el-input v-model="editForm.area"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 4, 5, 6]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      >
      </el-pagination>
      <!-- ポッポアップ -->
      <el-dialog
        title="添加商品"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogClose"
      >
        <!-- ポッポアップ 内容-->
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="addFormRules"
          label-width="80px"
        >
          <el-form-item label="商品名" prop="goodsName">
            <el-input v-model="addForm.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="goodsNum">
            <el-input v-model="addForm.goodsNum"></el-input>
          </el-form-item>
          <el-form-item label="E-mail" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'goods',
  data () {
    var checkemail = (rule, value, callback) => {
      const regEmail = /^([A-Za-z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的Email'))
    }
    return {
      goodsList: [],
      isShow: '',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      totalPage: 0,
      // 控制对话框的显示
      dialogVisible: false,
      // 控制编辑对话框的显示
      editDialogVisible: false,
      // 添加数据对象
      addForm: {
        goodsName: '',
        goodsNum: '',
        email: ''
      },
      addFormRules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goodsNum: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入商品email', trigger: 'blur' },
          { validator: checkemail, trigger: 'blur' }
        ]
      },
      // 编辑form
      editForm: {
        name: '',
        name_h: '',
        area: ''
      },
      editFormRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name_h: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$http.get('goods.json').then((res) => {
        this.goodsList = res.data.data.goods
        console.log(this.goodsList)
        this.totalPage = res.data.data.total
      })
    },
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    //
    statusChange (ststus) {
      this.ststus.ststus = false
    },
    // 表单重置
    dialogClose () {
      this.$refs.addForm.resetFields()
    },
    // 提交表单
    addGoodsInfo () {
      this.$refs.addForm.validate((valid) => {
        if (!valid) {

        } else {
          var newGoodsList = [
            {
              name: this.addForm.goodsName,
              name_h: this.addForm.goodsNum,
              area: this.addForm.email
            }
          ]
          this.goodsList = [...newGoodsList, ...this.goodsList]
          this.dialogVisible = false
          this.$message({
            showClose: true,
            message: '已经登录成功',
            type: 'success'
          })
        }
      })
    },
    // 删除btn
    async deleteGoodsInfo (index, row) {
      var text = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      console.log(text)
      // cancel   comfirm
      if (text == 'confirm') {
        this.goodsList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else if (text == 'cancel') {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 编辑btn押下
    editBtn (info) {
      this.editDialogVisible = true
      this.editForm = info
    },
    editGoodsInfo () {
      this.$refs.editForm.validate((valid) => {
        if (!valid) return
        this.goodsList = this.editForm
        this.editDialogVisible = false
        this.$message({
          showClose: true,
          message: '已经编辑成功',
          type: 'success'
        })
      })
    },
    editDialogClose () {
      this.$refs.editForm.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
