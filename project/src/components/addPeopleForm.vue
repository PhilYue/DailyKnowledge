<template>
  <div class="contract">
    <el-dialog title="添加随住人员" :visible.sync="addPeopleFormShow.show" size="small">
      <el-form inline ref="addPeopleForm" :rules="rules" :model="addPeopleForm" label-width="126px" label-position="right">
      <!-- 姓名手机号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addPeopleForm.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="addPeopleForm.phone" placeholder="手机号" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 身份证号性别 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="cardId">
              <el-input v-model="addPeopleForm.cardId" placeholder="证件号码" :maxlength="18"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addPeopleForm')">重 置</el-button>
        <el-button type="primary" @click="submitForm('addPeopleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'contractForm',
  data: function () {
    // 手机号验证
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!(/^1[3,4,5,7,8,9]\d{9}$/.test(value)) && value.length !== 13) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    // 身份证和护照验证
    var checkIdcard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'))
      }
      setTimeout(() => {
        if (value.length !== 9 && value.length !== 18 && value.length !== 10) {
          callback(new Error('请输入正确的身份证'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      addPeopleForm: {},
      rules: {
        // 姓名
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 32, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        // 手机号验证
        phone: [
          { required: true, validator: checkphone, trigger: 'blur' }
        ],
        // 身份证验证
        cardId: [
          { required: true, validator: checkIdcard, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置数据
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm (addPeopleForm) {
      this.$refs[addPeopleForm].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.contractUrl + 'addFollowUser', {
            certificateNumber: this.addPeopleForm.cardId, // 房源id
            contractId: this.contractId, // 片区id
            userName: this.addPeopleForm.name, // 用户姓名
            userPhone: this.addPeopleForm.phone
          }, {
          }).then(function (res) {
            let data = res.data
            if (data.code === 200) {
              this.$message('添加成功')
              this.resetForm('addPeopleForm')
              this.addPeopleFormShow.show = false
            }
          }, function (res) {
            console.log(res.status)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  props: ['contractId', 'addPeopleFormShow']
}
</script>
<style scoped>
.w100p{
  width: 100%;
}
.timeWidth{
  width: 130px!important;
}
.contract .el-input, .el-input__inner {
    width: auto;
}
.textarea{
  width: 100%!important;
}
.el-form--inline .el-form-item{
  margin-right: 0;
}
.radio{
  position: relative;
  top: -1px;
}
</style>














