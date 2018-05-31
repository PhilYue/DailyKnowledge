<template>
  <div class="clear login-css">
    <div class="fl loginBg">
      <div class="loginBg-pos">
        <div class="login_logo"></div>
        <p class="loginBg-p">随寓公寓管理系统</p>
      </div>
    </div>
    <div class="fl login-contain">
      <div class="login">
        <div class="head-top clear">
          <div class="fl head-top-fl" @click="change1" :class="{hover: !hover}">密码登录</div>
          <div class="fr head-top-fr" @click="change2" :class="{hover: hover}">短信登录</div>
        </div>
        <el-form v-show="showForm" class="form-mm" :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition">
          <el-form-item label="" prop="phone">
            <el-input class="phone_bg" @keydown.enter.native="submitForm('ruleForm')" placeholder="手机号码" :autofocus="true" v-model="ruleForm.phone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item @keydown.enter.native="submitForm('ruleForm')" label="" prop="region">
            <el-input class="password_bg" placeholder="登录密码" type="password" v-model="ruleForm.region" :maxlength="16"></el-input>
          </el-form-item>
          <el-button class="login-btn" @click="submitForm('ruleForm')" type="primary">登录</el-button>
          <div class="clear login-bottom">
              <router-link to="/resetLogin" class="fr login-fl">忘记密码?</router-link>
              <!-- <router-link to="/register" class="fr login-fr">免费注册</router-link> -->
          </div>
        </el-form>
        <el-form v-show="!showForm" class="form-dx" :model="ruleForm2" :rules="rules2" ref="ruleForm2" :label-position="labelPosition">
          <el-form-item label="" prop="Phone">
            <el-input class="phone_bg" @keydown.enter.native="submitForm2('ruleForm2')" placeholder="手机号码" :autofocus="true" v-model="ruleForm2.Phone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="" prop="Codee">
            <el-input @keydown.enter.native="submitForm2('ruleForm2')" class='fl chk code_bg' v-model="ruleForm2.Codee" placeholder="请输入验证码" :maxlength="6"></el-input>
            <el-button @click="getCode(ruleForm2)" class="fr but-css" :disabled="!show">
               <span v-show="show">获取验证码</span>
               <span v-show="!show" class="count">{{count}} s</span>
           </el-button>
          </el-form-item>
          <el-button class="login-btn" @click="submitForm2('ruleForm2')" type="primary">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/\d/.test(value)) {
        this.ruleForm.phone = ''
        callback(new Error('只能输入数字'))
      } else {
        setTimeout(() => {
          if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {  /* 此处放手机的正则验证 */
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }, 500)
      }
    }
    var checkAge2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/\d/.test(value)) {
        this.ruleForm2.Phone = ''
        callback(new Error('只能输入数字'))
      } else {
        setTimeout(() => {
          if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {  /* 此处放手机的正则验证 */
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }, 500)
      }
    }
    return {
      labelPosition: 'left',
      ruleForm: {
        phone: '',
        region: ''
      },
      ruleForm2: {
        Phone: '',
        Codee: ''
      },
      count: '',
      rules: {
        phone: [
          { required: true, validator: checkAge, trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      rules2: {
        Phone: [
          { required: true, validator: checkAge2, trigger: 'blur' }
        ],
        Codee: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      show: true,
      showForm: true,
      hover: false
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 登录接口
          this.$store.dispatch('userLogin', {'userName': this.ruleForm.phone, 'userPass': this.ruleForm.region})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm2 (ruleForm2) {
      this.$refs[ruleForm2].validate((valid) => {
        if (valid) {
          // 登录接口
          this.$store.dispatch('userLogin2', {'userName': this.ruleForm2.Phone, 'userPass': this.ruleForm2.Codee})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    change1 () {
      this.hover = false
      this.showForm = true
    },
    change2 () {
      this.hover = true
      this.showForm = false
    },
    getCode (ruleForm2) {
      if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.ruleForm2.Phone)) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  position: relative;
  width: 360px;
  top: 50%;
  margin: 0 auto;
  margin-top: -170px;
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
.login-btn{
  width: 100%;
  height: 40px;
  margin-top: 18px;
  margin-bottom: 20px;
}
.login-fl,.login-fr{
  font-size: 12px;
  font-family: "Helvetica Neue", "Hiragino Sans GB", "Segoe UI",
 "Microsoft Yahei", "微软雅黑", Tahoma, Arial, STHeiti, sans-serif;
  color: #20a0ff;
}
.head-top{
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 40px;
}
.head-top-fl{
  font-size: 20px;
  width: 50%;
  border-top-left-radius: 4px;
  color: #999;
}
.head-top-fr{
  font-size: 20px;
  width: 50%;
  border-top-right-radius: 4px;
  color: #999;
}
.form-dx{
  padding-bottom: 28px;
}
.hover{
  color: #20a0ff;
  border-bottom: 2px solid #20a0ff;
}
.chk {
  width: 65%;
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
</style>
