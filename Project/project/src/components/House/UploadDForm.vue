<template>
  <el-dialog title="附件上传" :visible.sync="visible" @close="close" top="10%">
    <div>
      <ul class="f-cb">
        <draggable v-model="fileList" :move="getdata" @update="datadragEnd">
          <transition-group>
            <li v-for="(file, index) in fileList" class="picList" :key="index">
              <span>
                <img :src="file">
              </span>
              <div class="close" @click="del(index)"></div>
            </li>
          </transition-group>
        </draggable>
      </ul>
    </div>
    <div class="f-cb button">
      <a href="javascript:;" class="file">选择附件
        <input v-if="!clicked" type="file" multiple="multiple" accept="image/png,image/jpg,image/gif,image/jpeg" @change="upload">
      </a>
      <a href="javascript:;" class="file" @click="submit" v-if="buttonShow">提交附件</a>
    </div>
  </el-dialog>

</template>

<script>
  import co from 'co'
  import OSS from 'ali-oss'
  import draggable from 'vuedraggable'
  import { api } from '@/xhr'

  const ossUrl = 'http://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/'

  let client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAIO4b0QuTFayss',
    accessKeySecret: 'YxhLfONrc24a8a6AcBA8KznmaPOphS',
    bucket: 'sayyoo-bucket-image'
  })

  export default {
    props: {
      type: {
        type: String,
        default: 'house'
      },
      context: Object,
    },

    components: {
      draggable
    },

    data() {
      return {
        buttonShow: false,
        uploadOver: false,

        visible: true,
        addrList: [],
        reqFileBeanList: [],
        clicked: false,
        fileList: [], // 显示图片的列表
        picList: [], // 图片源文件列表
      }
    },

    methods: {
      submit() {
        if (this.clicked) return
        
        this.clicked = true
        let len = this.picList.length
        let picTokenUrl = this.$store.state.pdfUrl + 'token'
        this.$http.post(picTokenUrl, {
          'fileCount': len,
          'ossType': 'image'
        }).then(res => {
          if (res.body.code === 200) {
            for (let i = 0; i < len; i++) {
              let file = {}
              file = this.picList[i]
              let reader = new FileReader()
              reader.readAsDataURL(file)

              let type = file.name.split('.')[1]
              let name = res.body.data.fileNames[i] + '.' + type

              const fileUrl = ossUrl + name

              if (this.type === 'contract') {
                this.addrList.push(fileUrl)
              } else if (this.type === 'house') {
                this.reqFileBeanList.push({
                  fileName: file.name,
                  fileSize: file.size,
                  fileUrl,
                })
              }

              reader.onload = () => {
                // 向阿里云上传图片
                co(function* () {
                  yield client.multipartUpload(name, file)
                }).then(() => {
                  this.clicked = false
                })
              }
            }

            // 将图片地址提交到数据库

            ((type) => {
              const callback = res => {
                if (res.data.code === 200) {
                  this.$message({
                    message: '附件上传成功',
                    type: 'success'
                  })
                  this.clicked = false
                  this.$emit('close')
                } else {
                  this.$message({
                    message: '附件上传失败',
                    type: 'error'
                  })
                  this.clicked = false
                }
              }

              let { houseSpaceId, keywordAddressGeographic, houseSpaceStatus } = this.context

              if (type === 'contract') {
                let params = {
                  inputPersonnelId: this.$store.state.currentUser.uid,
                  addrList: this.addrList
                }
                api.contractAttachment.create(params).then(callback)
              } else if (type === 'house') {
                let params = {
                  inputPersonnelId: this.$store.state.currentUser.uid,
                  reqFileBeanList: this.reqFileBeanList,
                  houseSpaceId,
                  fileMemo: keywordAddressGeographic,
                  houseSpaceFileType: 'C',
                  houseSpaceStatus,
                }
                api.houseFile.create(params).then(callback)
              }

            })(this.type)

          } else {
            this.$message({
              message: '网络故障，请稍候再试',
              type: 'error'
            })
          }
        })
      
      },

      upload(event) {
        if (this.clicked) return

        for (let i = 0; i < event.currentTarget.files.length; i++) {
          let file = event.currentTarget.files[i]
          this.picList.push(file)

          let reader = new FileReader() // 新建FileReader对象
          reader.readAsDataURL(file)
          reader.onload = () => {
            this.fileList.push(reader.result)
            this.buttonShow = true
          }
        }
      },

      del(index) {
        this.fileList.splice(index, index + 1)
        this.picList.splice(index, index + 1)
        if (this.fileList.length === 0) {
          this.buttonShow = false
        }
      },

      close() { // 关闭弹窗
        this.$emit('close')
      },

      getdata(evt) {},
      datadragEnd(evt) {}
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

  .picList {
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

  .picList span {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .picList img {
    max-width: 150px;
    max-height: 150px;
    vertical-align: middle;
  }

  .upLoat {
    width: 650px;
    padding: 30px 20px;
    top: 7%;
    position: fixed;
    left: calc(50vw - 325px);
    background-color: #fff;
  }

  .picList div {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 1;
    background: url(../../../static/img/close.png) no-repeat center center / 100% 100%;
    transition: all .25s;
    cursor: pointer;
  }

  .picList div:hover {
    background-image: url(../../../static/img/close_blue.png);
  }

  .f-cb {
    zoom: 1;
    clear: both;
  }

  .f-cb:after {
    content: "";
    display: block;
    clear: both;
  }

</style>
