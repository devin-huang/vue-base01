<template>
  <div class="main">
    <h2>移动端优化：将上传大图片通过CANVAS转变成小图</h2>
    <div id="upladArea">
      <input
        id="uploadId"
        type="file"
        name="upload"
        @change="handleUploadSize"
      />
    </div>
    <h2>utils base elementUI develop (工具基于elementUI开发)</h2>
    <div>
      <el-tag>1.input check (输入校验)</el-tag>
      <p>
        <i>1.Support custom regex.(支持自定义正则) 2. Default values(默认值)</i>
      </p>
      <p>
        Using regular checkSums, checkSums are performed on input or
        change（运用正则校验，在输入或失去光标时进行校验）
      </p>
      <input-check placeholder="Input Check">
        <div slot="prepend">Test</div>
        <div slot="append">Number</div>
      </input-check>
    </div>
    <div>
      <el-tag>2.click outside</el-tag>
      <div v-click-out-side="handleCancel" class="inside">
        <h4>
          外部关闭对象 | 点击次数: <b style="color:red">{{ num }}</b>
        </h4>
        <div>使用指令通过binding.value实现</div>
      </div>
    </div>
    <div>
      <el-tag>3.封装elementUI - datePicker组件</el-tag>
      <div>
        注意：父子组件v-model得传值 / $attrs、$listeners
        暴露el-datepicker属性方法在外层
      </div>
      <div>
        <date-picker v-model="test" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import inputCheck from '@/components/InputCheck'
import DatePicker from '@/components/DatePicker'

export default {
  name: 'Home',
  components: {
    inputCheck,
    DatePicker
  },
  data() {
    return {
      num: 0,
      test: '2016-05-02',
      value: null
    }
  },
  methods: {
    handleCancel() {
      ++this.num
    },
    handleUploadSize(e) {
      let upload = document.querySelector('#uploadId')
      console.log(e, upload.files[0], 'fileList')
      for (let file of upload.files) {
        let read = new FileReader()
        console.log(read.readAsDataURL(file), file)
        read.onload = function(ev) {
          console.log(ev)
          let image = new Image()
          image.src = ev.target.result

          var Canvas = document.createElement('Canvas')
          //定义image 事件//base64地址图片加载完毕后
          var context = Canvas.getContext('2d')
          image.onload = function() {
            var originWIDth = this.width
            var originHeight = this.height
            console.log(originWIDth, originHeight)
            if (file.size > 1024 * 100) {
              Canvas.height = 200
              context.drawImage(image, 0, 0, 300, 300)
              var dataURL = Canvas.toDataURL(file.type, 0.1)

              let upladArea = document.querySelector('#upladArea')
              let img = document.createElement('IMG')
              img.setAttribute('src', dataURL)
              upladArea.insertBefore(img, upload)
              console.log(dataURL)
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  font-size: 10px;
  width: 680px;
  margin: 0px auto;
  h3 {
    text-align: left;
  }
  .el-tag {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
.inside {
  width: 250px;
  margin: 0px auto;
  background-color: lightblue;
}
</style>
