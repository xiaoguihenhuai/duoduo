<template>
  <div class="login_contaniner">
    <div class="login_box">
      <div class="login_pic">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="login_form"
        :rules="rules"
        class="login_form"
        label-width="0"
        ref="formRef"
      >
        <el-form-item prop="user">
          <el-input
            v-model="login_form.user"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="paw">
          <el-input
            v-model="login_form.paw"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginBtn">登録</el-button>
          <el-button type="info" @click="resetForm">クリア</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      login_form: {
        user: '',
        paw: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入usercode', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        paw: [
          { required: true, message: '请输入password', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.formRef.resetFields()
    },
    loginBtn () {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          window.sessionStorage.setItem('login', 'succse')
          this.$router.push('/home')
        } else {
          this.$message({
            showClose: true,
            message: '错了哦，这是一条错误消息',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login_contaniner {
  background: #2b4b6b;
  height: 100%;
}
.login_contaniner .login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_contaniner .login_box .login_pic {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
.login_contaniner .login_box .login_pic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
