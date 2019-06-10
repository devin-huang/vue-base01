<!--
/^[1-9]\d*/                               ===> 正整数
/^((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}/       ===> 正数价格保留两位小数
/^100$|^(\d|[1-9]\d)$/                    ===> 大于0小于100正整数
/^[\-|0-9][0-9]*/                         ===> 负数
-->
<template>
  <section>
    <el-input
      v-bind="$attrs"
      v-model.trim="val"
      @change.native="handleChange"
      @input.native="handleKeyup"
    >
      <template slot="prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append">
        <slot name="append"></slot>
      </template>
    </el-input>
  </section>
</template>

<script>
export default {
  name: 'index',
  props: {
    data: { type: [String, Number] },
    regType: { type: RegExp, default: () => /^[1-9]\d*/ }
  },
  data () {
    return {
      val: null
    }
  },
  watch: {
    data: {
      immediate: true,
      handler (val) {
        this.val = val
      }
    }
  },
  methods: {
    handleStrChange () {
      let val = this.val ? this.val : '';
      let reg = new RegExp(this.regType)
      return (this.val = val.match(reg) ? val.match(reg)[0] : '');
    },
    handleChange () {
      if (this.regType) {
        let param = this.handleStrChange()
        this.$emit('change', param) // 等同于el-input change
      }
    },
    handleKeyup () {
      if (this.regType) {
        let param = this.handleStrChange()
        this.$emit('input', param)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section /deep/ {
  display: inline-block;
  position: relative;
}
</style>
