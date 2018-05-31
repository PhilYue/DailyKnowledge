<template>
<div class="clear login-css">
  <div class="fl loginBg">
    <div class="loginBg-pos">
      <div class="login_logo"></div>
      <p class="loginBg-p">随寓公寓管理系统</p>
    </div>
  </div>
  <div class="fl login-contain">
    <div class="resetLogin">
        <p class="txt-c resetLogin-title">修改密码</p>
        <el-radio-group v-model="labelPosition" size="small"></el-radio-group>
        <el-form :label-position="labelPosition" :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
          <el-form-item label="" prop="Phone">
            <el-input class="phone_bg" @keyup.native="yanzheng()" placeholder="手机号码" v-model="ruleForm2.Phone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="" prop="Codee">
            <el-input class='fl chk code_bg' v-model="ruleForm2.Codee" placeholder="请输入验证码" :maxlength="6"></el-input>
            <el-button @click="getCode(ruleForm2)" class="fr but-css" :disabled="!show">
               <span v-show="show">获取验证码</span>
               <span v-show="!show" class="count">{{count}} s</span>
           </el-button>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input class="password_bg" placeholder="须同时包含大小写字母和数字，至少8位" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input class="password_bg" placeholder="确认密码" type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-button class="w-100p mg-bottom" type="primary" @click="submitForm('ruleForm2')">确认修改</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/\d/.test(value)) {
        this.ruleForm.phone = ''
        callback(new Error('只能输入数字'))
      } else {
        setTimeout(() => {
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {  /* 此处放手机的正则验证 */
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }, 500)
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)) {
        callback(new Error('须同时包含大小写字母和数字，至少8位'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        phone: '',
        code: ''
      },
      show: true,
      count: '',
      timer: null,
      labelPosition: 'left',
      ruleForm2: {
        pass: '',
        checkPass: '',
        Phone: this.$store.state.currentUser.UserPhone,
        Codee: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        Codee: [
          { validator: validateCode, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        Phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 修改密码和短信验证码验证接口
          this.$http.post(this.$store.state.accountUrl + 'user/update/pwd', {
            loginname: this.ruleForm2.Phone,
            captcha: this.ruleForm2.Codee,
            password: this.ruleForm2.pass
          }).then(function (response) {
            var data = response.data
            console.log(data)
            if (data.code === 200) {
              this.$message('密码修改成功')
              this.$router.push({name: 'login'})  // 跳转到首页
            }
          }, function (response) {
            console.log(response.status)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm (ruleForm2) {
      this.$refs[ruleForm2].resetFields()
    },
    yanzheng () {
      if (this.ruleForm2.Phone.length === 11 && /^[1][3,4,5,7,8][0-9]{9}$/.test(this.ruleForm2.Phone)) {
        this.$http.get(this.$store.state.accountUrl + 'user/info/p/' + this.ruleForm2.Phone
          ).then(function (response) {
            var data = response.data
            console.log(data)
            if (data.code === 200) {
            } else if (data.code === 10000) {
              this.$message({
                message: '此手机号未注册',
                duration: 3500,
                type: 'warning'
              })
            }
          }, function (response) {
            console.log(response.status)
          })
      }
    },
    getCode (ruleForm2) {
      if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.ruleForm2.Phone)) {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
        // 获取短信验证码接口
        this.$http.post(this.$store.state.accountUrl + 'user/sms/send', {
          phone: this.ruleForm2.Phone
        }).then(function (response) {
          var data = response.data
          console.log(data)
          if (data.code === 200) {
            this.$message('短信验证码已发送')
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        this.$message('请先输入正确的手机号')
      }
    }
  }
}
</script>
<style scoped>
.resetLogin{
  position: relative;
  width: 360px;
  top: 50%;
  margin: 0 auto;
  margin-top: -194px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff;
}
.loginBg{
  position: relative;
  width: 50%;
  height: 100vh;
  background-image: url(../../static/img/loginBg.jpg);
  background-size: 100% 100%;
}
.chk {
  width: 65%;
}

.resetLogin-title{
  font-size: 24px;
  color: #999;
  margin-top: 12px;
}
.loginBg-pos{
  text-align: center;
  position: relative;
  top: 20%;
}
.login_logo{
  width: 110px;
  height: 151px;
  background-image: url(../../static/img/login_logo.png);
  background-size: 100% 100%;
  margin: 0 auto 25px;
}
.loginBg-p{
  color: #fff;
  font-size: 50px;
  font-weight: bold;
}
.login-contain{
  background-color: #f2f2f2;
  width: 50%;
  height: 100vh;
}
.login-bottom{
  margin-bottom: 10px;
}
.mg-bottom{
  margin-bottom: 16px;
}
</style>
















