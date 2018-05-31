<template>
  <!-- urlLists 承载合同或者房源信息，除了链接list，其他的信息全部都由父组件传递，如id等 -->
    <!-- <div class="upLoat"> -->
      <el-dialog :title="uploadName.title" :visible.sync="show" @close="close"  top="10%">
        <div>
          <ul class="f-cb">
            <draggable v-model="fileList" :move="getdata" @update="datadragEnd">
                <transition-group>
                    <li v-for="(file, index) in fileList" class="picList" :key="index">
                      <span><img :src="file"></span>
                      <div class="close" @click="del(index)"></div>
                    </li>
                </transition-group>
            </draggable>
          </ul>
        </div>
        <div class="f-cb button">
          <a href="javascript:;" class="file">选择{{uploadName.btnName}}
              <input type="file" multiple="multiple" :accept="typeArr" @change="upload($event)" v-if="clickOver">
          </a>
          <a href="javascript:;" class="file" @click="submit()" v-if="buttonShow">提交{{uploadName.btnName}}</a>
        </div>
      </el-dialog>

</template>
<script>
var co = require('co')
var OSS = require('ali-oss')
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      client: '',
      fileSize: 50000000,
      show: false,
      url: 'http://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/', // 图片链接地址
      fileList: [], // 显示图片的列表
      picLists: [], // 图片源文件列表
      mix: {
        picAdd: this.$store.state.contract + 'attachment/add'
      },
      buttonShow: false,
      clickOver: true, // 判断当前是否在上传
      uploadOver: false //
    }
  },
  props: ['typeArr', 'uploadData', 'detailClick', 'urlLists', 'uploadName'],
  components: {draggable},
  watch: {
    detailClick: function () {
      this.fileList = []
      this.picLists = []
      // this.urlLists.contractId = this.uploadData.contractId
      this.urlLists.addrList = []
      this.show = this.uploadData.show
      this.clickOver = true
      this.buttonShow = false
      this.uploadOver = false
    }
  },
  methods: {
    upload (event) { // 添加图片
      if (this.clickOver) {
        var _this = this
        for (let i = 0; i < event.currentTarget.files.length; i++) {
          let file = event.currentTarget.files[i]
          _this.picLists.push(file)
          let reader = new FileReader() // 新建FileReader对象
          reader.readAsDataURL(file)
          reader.onload = function () {
            _this.fileList.push(reader.result)
            _this.buttonShow = true
          }
        }
      }
    },
    del (index) { // 删除图片
      this.fileList.splice(index, index + 1)
      this.picLists.splice(index, index + 1)
      if (this.fileList.length === 0) {
        this.buttonShow = false
      }
    },
    close () { // 关闭弹窗
      this.$emit('uploadSuccess')
    },
    submit () { // 上传图片
      if (this.clickOver) {
        this.clickOver = false
        var _this = this
        let len = _this.picLists.length
        let picToken = this.$store.state.pdfUrl + 'token'
        _this.$http.post(picToken, {
          'fileCount': len,
          'ossType': 'image'
        }).then(res => {
          if (res.body.code === 200) {
            var client = new OSS({
              region: 'oss-cn-hangzhou',
              accessKeyId: 'LTAIO4b0QuTFayss',
              accessKeySecret: 'YxhLfONrc24a8a6AcBA8KznmaPOphS',
              bucket: 'sayyoo-bucket-image'
            })
            // let count = 0
            for (let i = 0; i < len; i++) {
              let file = {}
              file = this.picLists[i]
              var reader = new FileReader() // 新建FileReader对象
              reader.readAsDataURL(file)
              // 图片加载完全时执行
              let type = file.name.split('.')[1]
              let name = res.body.data.fileNames[i] + '.' + type
              if (_this.urlLists.type === 'contract') {
                _this.urlLists.addrList.push(_this.url + name)
              } else if (_this.urlLists.type === 'house') {
                let list = {}
                list.fileName = file.name
                list.fileSize = file.size
                list.fileUrl = _this.url + name
                _this.urlLists.reqFileBeanList.push(list)
              }
              reader.onload = function () {
                // 向阿里云上传图片
                co(function*() {
                  yield client.multipartUpload(name, file)
                }).catch(function (err) {
                  console.log(err)
                  _this.clickOver = true
                })
              }
            }
            // 将图片地址提交到数据库
            _this.urlLists.loginId = _this.$store.state.currentUser.uid
            _this.urlLists.inputPersonnelId = _this.$store.state.currentUser.uid
            if (_this.urlLists.type === 'contract') {
              let url = _this.$store.state.contractUrl + 'attachment/add'
              _this.$http.post(url, _this.urlLists).then(res => {
                if (res.body.code === 200) {
                  _this.$message({
                    message: '附件上传成功',
                    type: 'success'
                  })
                  this.clickOver = true
                  _this.$emit('uploadSuccess')
                } else {
                  _this.$message({
                    message: '附件上传失败',
                    type: 'error'
                  })
                  _this.clickOver = true
                }
              })
            } else if (_this.urlLists.type === 'house') {
              let url = _this.$store.state.houseUrl + 'save/file'
              _this.$http.post(url, _this.urlLists).then(res => {
                if (res.body.code === 200) {
                  _this.$message({
                    message: '附件上传成功',
                    type: 'success'
                  })
                  _this.clickOver = true
                  _this.$emit('uploadSuccess')
                } else {
                  _this.$message({
                    message: '附件上传失败',
                    type: 'error'
                  })
                  _this.clickOver = true
                }
              })
            }
          } else {
            _this.$message({
              message: '网络故障，请稍候再试',
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '附件上传中，请不要重复提交',
          type: 'error'
        })
      }
    },
    getdata (evt) {
    },
    datadragEnd (evt) {
    }
  }
}
</script>
<style scoped>
    .file {
      /*position: relative;
      left: .26rem;
      top: .2rem;*/
      position: relative;
      display: block;
      background: #20a0ff;
      border: 1px solid #99D3F5;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: white;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      width: 90px;
      text-align: center;
      margin-left: 10px;
      float: left;
      /*margin:  0 auto;*/
    }

    .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
    }
    .picList{
      width: 150px;
      height: 150px;
      margin: 0 0 10px 10px;
      background-color: #fff;
      text-align: center;
      display: table;
      float: left;
      border: 1px solid #eee;
      position: relative;
    }
    .picList span{
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    .picList img{
      max-width: 150px;
      max-height: 150px;
      vertical-align: middle;
    }
    .upLoat{
      width: 650px;
      padding: 30px 20px;
      top: 7%;
      position: fixed;
      left: calc(50vw - 325px);
      background-color: #fff;
    }
    .picList div{
      width: 10px;
      height: 10px;
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 1;
      background: url('../../../static/img/close.png') no-repeat center center / 100% 100%;
      transition: all .25s;
      cursor: pointer;
    }
    .picList div:hover{
      background-image: url('../../../static/img/close_blue.png');
    }
    .f-cb {
      zoom: 1;
      clear:both;
    }
    .f-cb:after {
      content: "";
      display: block;
      clear: both;
    }
</style>