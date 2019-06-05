<template>
  <div>
    <h2>通过vue/cli3内置webpack配置打包</h2>
    <h4>自动将src/assets/下静态资源打包</h4>
    <section class="webpackStyle">
      <div>
        HTML Insert:
        <img class="htmlType" src="../../assets/hello.png" width="50px" />
      </div>
      <div>
        CSS Insert:
        <div class="cssType"></div>
      </div>
      <div>
        JS Insert:
        <div class="jsType"></div>
      </div>
    </section>
    <section class="css3">
      <div class="fixed">
        <h4>自动将CSS3添加兼容前缀</h4>
        CSS3:
      </div>
      <div class="icon">
        <span>FontAWSome:</span>
        <i class="fas fa-address-card fa-lg"></i>
        <i class="fab fa-amazon fa-lg"></i>
        <i class="fab fa-font-awesome fa-lg"></i>
        <i class="fas fa-arrow-down" style="color: Dodgerblue;"></i>
        <i class="fas fa-stroopwafel fa-spin"></i>
        <i
          class="fas fa-snowman"
          data-fa-transform="rotate-90"
          style="background:MistyRose"
        ></i>
        <span class="fa-layers fa-fw" style="background:MistyRose">
          <i class="fas fa-circle" style="color:Tomato"></i>
          <i class="fa-inverse fas fa-times" data-fa-transform="shrink-6"></i>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      logo: null
    }
  },
  watch: {
    logo: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          let imgUrl = require('../../assets/hello.png');
          let img = new Image()
          img.style.width = '100%';
          img.src = imgUrl
          document.querySelector('.jsType').appendChild(img)
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.webpackStyle /deep/ {
  display: flex;
  & div {
    flex-grow: 1;
    img.htmlType {
      width: 100px;
    }
    .cssType {
      background-image: url("../../assets/hello.png");
      background-size: 35%;
      @extend .jsType;
    }
    .jsType {
      border: thin solid #ccc;
      display: inline-block;
      width: 100px;
      height: 100px;
    }
  }
}
.css3 /deep/ {
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  div.fixed {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    transform: skewX(-10deg);
    background: linear-gradient(yellow, lightblue);
  }
  .icon {
    display: flex;
    justify-content: space-around;
  }
}
</style>
