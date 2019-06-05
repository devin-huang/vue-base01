<template>
  <div class="main">
    <h2>utils base elementUI develop (工具基于elementUI开发)</h2>
    <div>
      <el-tag>1.input check (输入校验)</el-tag>
      <p><i>1.Support custom regex.(支持自定义正则) 2. Default values(默认值)</i></p>
      <p>Using regular checkSums, checkSums are performed on input or change（运用正则校验，在输入或失去光标时进行校验）</p>
      <input-check placeholder="Input Check" >
        <div slot="prepend">Test</div>
        <div slot="append">Number</div>
      </input-check>
    </div>
    <div>
      <el-tag>2.click outside</el-tag>
      <div class="inside" v-click-out-side="handleCancel">
        <h4>外部关闭对象 | 点击次数: <b style="color:red">{{num}}</b></h4>
        <div>使用指令通过binding.value实现</div>
      </div>
    </div>
    <div>
      <el-tag>3.封装elementUI - datePicker组件</el-tag>
      <div>注意：父子组件v-model得传值 / $attrs、$listeners 暴露el-datepicker属性方法在外层</div>
      <div>
        <date-picker v-model="test"></date-picker>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import inputCheck from "@/components/inputCheck"
import DatePicker from "@/components/DatePicker"

export default {
  name: 'home',
  data () {
    return {
      num: 0,
      test: '2016-05-02'
    }
  },
  components: {
    inputCheck,
    DatePicker
  },
  methods: {
    handleCancel (e) {
      ++this.num
    }
  }
};
</script>
<style lang="scss" scoped>
  .main{
    font-size: 10px;
    width:680px;
    margin:0px auto;
    h3 {
      text-align: left;
    }
    .el-tag {
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
  .inside {
    width:250px;
    margin:0px auto;
    background-color: lightblue;
  }
</style>
