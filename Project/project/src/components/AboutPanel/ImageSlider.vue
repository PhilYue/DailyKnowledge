ImageSlider - 图片轮播

<template>
  <div class="image-slider">
    <i class="image-slider__btn" @click="handleClose"></i>

    <div class="image-slider__center-box">
      <img class="image-slider__img" :src="currentImageSrc">

      <div class="image-slider__controls">
        <i class="image-slider__i el-icon-arrow-left" @click="goPrev"></i>
        <i class="image-slider__i el-icon-arrow-right" @click="goNext"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    initial: {
      type: Number,
      default: 0
    }
  },
  
  data () {
    return {
      index: 0,
      changed: false
    }
  },

  mounted() {
    this.index = this.initial
    this.changed = true
  },

  computed: {
    currentImageSrc() {
      return this.changed
        ? this.images[this.index] : this.images[this.initial]
    }
  },

  methods: {
    goPrev() {
      this.index = this.index === 0
        ? this.images.length - 1 : this.index - 1
    },

    goNext() {
      this.index = this.index === this.images.length - 1
        ? 0 : this.index + 1
    },

    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">

  .image-slider {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
  }

  .image-slider__center-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background: #fff;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }

  .image-slider__img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .image-slider__i {
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);

    &.el-icon-arrow-left {
      left: -40px;
    }

    &.el-icon-arrow-right{
      right: -40px;
    }
  }

  .image-slider__btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 100px;
    height: 100px;
    background: url(../../../static/img/close.svg) no-repeat left center / 25px 25px;
    cursor: pointer
  }
</style>
