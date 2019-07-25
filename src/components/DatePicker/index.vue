<template>
  <div>
    <el-date-picker v-model="date" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    value: { type: [Date, String], default: null }
  },
  data() {
    return {
      date: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.date = val
      }
    }
  }
}
</script>
