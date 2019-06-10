<template>
  <div>
    <el-date-picker v-model="date" v-bind="$attrs" v-on="$listeners">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    value: { type: [Date, String], default: null }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.date = val
      }
    }
  },
  data () {
    return {
      date: null
    }
  }
}
</script>
