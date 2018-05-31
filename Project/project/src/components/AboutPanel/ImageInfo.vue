<template>
  <ul>
    <div class="image-info-container">
      <li v-for="(item, index) in data" :key="index" @click="open(index)">
        <a href="javascript:void(0)" target="_blank">
          <div class="img">
            <div>
              <span>
                <img :src="item.fileUrl + '?x-oss-process=style/zoom_rule'">
              </span>
            </div>
            <div class="btn1">
              <div @click.stop="toTop(item)"><p>置顶</p></div>
              <div @click.stop="deleteImg(item)"><p>删除</p></div>
            </div>
          </div>
          <p>{{item.fileName}}</p>
        </a>
      </li>
    </div>

    <empty-block v-if="!data.length"/>

    <image-slider
      v-if="isImageSliderShowing"
      :images="this.images"
      :initial="initialImageIndex"
      @close="handleClose"
    />
  </ul>
</template>

<script>
import {messageCancel, report} from '@/lib'
import ImageSlider from './ImageSlider'

export default {
  props: {
    context: Object,
  },

  components: {
    ImageSlider,
    EmptyBlock: () => import('@/components/controls/EmptyBlock')
  },

  data () {
    return {
      data: [],
      isImageSliderShowing: false,
      initialImageIndex: 0,
    }
  },

  computed: {
    images() {
      return this.data.map(item => item.fileUrl)
    }
  },

  created () {
    this.loadData()
  },
  
  methods: {
    handleClose() {
      this.isImageSliderShowing = false
    },
    
    loadData () {
      const {houseSpaceId} = this.context
    
      let url = this.urlList.house + 'list/houseSpaceFile'
      this.$http.post(url, {houseSpaceId}).then((res) => {
        if (res.body.code === 200) {
          this.data = res.body.data
        }
      })
    },
    
    open (i) {
      this.initialImageIndex = i
      this.isImageSliderShowing = true
    },

    toTop (item) {
      this.$confirm('确定置顶图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        let url = this.urljoin(this.urlList.house, 'file/stick')
        let params = {
          houseSpaceId: this.context.houseSpaceId,
          fileId: item.id,
        }
        this.$http.post(url, params).then((res) => {
          report(res.body, '置顶', this.loadData)
        })
      }).catch(messageCancel)
    },

    deleteImg (item) {
      this.$confirm('确定删除图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.urljoin(this.urlList.house, 'file/delete/', item.id)
        this.$http.get(url).then((res) => {
          report(res.body, 'destroy', this.loadData)
        })
      }).catch(messageCancel.bind(this, 'delete'))
    },
  }

}
</script>

<style lang="scss" scoped>
  .image-info-container{
    padding-top: 40px;
  }
  .image-info-container li{
    width: 125px;
    float: left;
    height: 150px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 0;
  }
  .image-info-container li:nth-child(2n){
    margin-right: 0;
  }
  
  .image-info-container li .img{
    width: 100%;
    height: 125px;
    /*display: table;*/
    border: 1px solid #cecece;
    overflow: hidden;
    position: relative;
  }
  .image-info-container li .img div{
    width: 100%;
    height: 125px;
    display: table;
    /*border: 1px solid #cecece;*/
   }

  .image-info-container li .img span{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .image-info-container li .img img{
    max-height: 125px;
    max-width: 125px;
  }
  .image-info-container li .img .btn1{
    height: 20px;
    /*border-top: 1px solid #cecece;*/
    /*border-top-width: 0;*/
    position: absolute;
    background: rgba(0,0,0,.5);
    transition: all .25s;
    -webkit-transition: all .25s;
    bottom: 0;
    left: 0;
    opacity: 0;
    -webkit-opacity: 0;
  }
  .image-info-container li .btn1 div{
    border-top: 1px solid #cecece;
    border-width: 0;
    height: 28px;
  }
  .image-info-container li .btn1 p{
    width: 50%;
    height: 20px;
    line-height: 20px;
    border-radius: 3px;
    margin: 4px 25%;
    /*float: left;*/
    background: #20a0ff;
    color: #fff;
  }
  .image-info-container li:hover .img .btn1{
    opacity: 1;
    -webkit-opacity: 1;
  }
  .image-info-container li p{
    text-align: center;
    font-size: 14px;
    color: #333;
    overflow: hidden; white-space: nowrap; text-overflow: ellipsis; 
  }
</style>
