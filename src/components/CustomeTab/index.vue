<template>
  <section class="tab">
    <div class="tab-list">
      <slot/>
    </div>
    <div class="tab-content">
      <slot name="tabContent"/>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  methods: {
    ...mapActions('Common', ['findDeviceList'])
  },
  created() {
    this.findDeviceList({ pageNum: 1 })
  }
}
</script>

<style scoped lang="scss">
$borderSize: thin solid #e4e7ed;
$padding: 15px;
$color: #409eff;
$zero: 0px;
@mixin tag-title($border, $color) {
  color: $border;
  padding: $padding;
  border: $borderSize;
  background: $color;
  cursor: pointer;
}

.tab {
  width: 100%;
  height: 100%;
  .tab-list {
    ul {
      display: flex;
      padding: $zero;
      margin: $zero;
      list-style: none;
      li {
        flex-direction: row;
        position: relative;
        top: 1px;
        @include tag-title(#909399, #f5f7fa);
        &.active {
          @include tag-title($color, white);
          border-bottom: none;
        }
        &:hover {
          color: $color;
        }
      }
    }
  }
  .tab-content {
    padding: $padding;
    border: $borderSize;
  }
}
</style>
