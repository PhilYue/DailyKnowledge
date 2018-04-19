<template>
  <div>
    <div class="loginBg"></div>
    <div class="resetLogin">
      <p class="txt-c ftW-b">注册</p>
      <el-radio-group v-model="labelPosition" size="small"></el-radio-group>
      <el-form :label-position="labelPosition" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
        <el-form-item label="手机号码" prop="phone">
          <el-input @keyup.native="yanzheng()" placeholder="手机号码" :autofocus="true" v-model="ruleForm2.phone" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="Codee">
          <el-input class='fl chk' v-model="ruleForm2.Codee" placeholder="请输入验证码" :maxlength="6"></el-input>
          <el-button @click="getCode(ruleForm2)" class="fr" :disabled="!show">
             <span v-show="show">获取验证码</span>
             <span v-show="!show" class="count">{{count}} s</span>
         </el-button>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input placeholder="须同时包含大小写字母和数字，至少8位" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input placeholder="确认密码" type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-button class="w-100p" type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      var checkAge = (rule, value, callback) => {
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
      return {
        labelPosition: 'left',
        ruleForm2: {
          pass: '',
          checkPass: '',
          phone: '',
          Codee: ''
        },
        show: true,
        count: '',
        rules2: {
          phone: [
            { validator: checkAge, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (ruleForm2) {
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
          // 注册接口
            this.$http.post(this.$store.state.accountUrl + 'user/signin', {
              phone: this.ruleForm2.phone,
              password: this.ruleForm2.pass,
              captcha: this.ruleForm2.Codee,
              captchaType: 'SMS'
            }).then(function (response) {
              var data = response.data
              console.log(data)
              if (data.code === 200) {
                this.$router.push({name: 'login'})  // 跳转到首页
              } else if (data.code === 10006) {
                this.$message({
                  message: '此手机号已注册',
                  duration: 3500
                })
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
      yanzheng () {
        if (this.ruleForm2.phone.length === 11 && /^[1][3,4,5,7,8][0-9]{9}$/.test(this.ruleForm2.phone)) {
          this.$http.get(this.$store.state.accountUrl + 'user/info/p/' + this.ruleForm2.phone
            ).then(function (response) {
              var data = response.data
              console.log(data)
              if (data.code === 200) {
                this.$message({
                  message: '此手机号已注册',
                  duration: 3500,
                  type: 'warning'
                })
              } else if (data.code === 10000) {
              }
            }, function (response) {
              console.log(response.status)
            })
        }
      },
      resetForm (ruleForm2) {
        this.$refs[ruleForm2].resetFields()
      },
      getCode (ruleForm2) {
        if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.ruleForm2.phone)) {
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
            phone: this.ruleForm2.phone
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
  position: absolute;
  left: 65%;
  margin-left: -175px;
  width: 350px;
  padding: 20px;
  top: 30%;
  border-radius: 4px;
  background-color: #fff;
}
.chk {
  width: 50%;
}
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #20a0ff;
  color: #fff;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
}
.loginBg{
  width: 100%;
  height: 100vh;
  background-image: url(../../static/img/loginBg.jpg);
  background-size: 100% 100%;
}
.w-100p{
  width: 100%;
}
</style>
















