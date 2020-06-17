<template>
  <el-dialog
    :top="top"
    :center="center"
    :title="title"
    :width="width"
    :visible.sync="visible"
    :fullscreen="fullscreen"
    :lock-scroll="lockScroll"
    :before-close="close"
  >
    <component :is="__component__" />
  </el-dialog>
</template>
<script>
import { Dialog, Divider } from 'element-ui'
export default {
  name: 'DialogWrapper',
  components: {
    [Dialog.name]: Dialog,
  },
  props: {
    top: {
      type: String,
      default: '15vh'
    },
    center: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: '50%'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeAfterSubmit: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function
    },
    // component: {
    //   required: false
    // },
    render: {
      required: true,
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    __component__ () {
      // 使用 render 字段获取Vnode
      // 由于使用JSX 编译时不会自动生成render,现在手动调用$createElement生成（新版vue/cli3可将jsx转render）
      // this指向实例化后的当前Dialog组件
      const that = this
      const h = this.$createElement
      const vNode = typeof(this.render) === 'function' ? this.render(h) : this.render
      return {
        name: 'dialog-wrapper',
        render: function () {
          // 是否启动自定义事件
          if (that.closeAfterSubmit) {
            if (!vNode.componentOptions) return vNode;
            const listeners = vNode.componentOptions.listeners || {}
            const submitEvent = listeners.submit
            // 是否有提交事件
            if(submitEvent){
              listeners.submit = function(...args){
                submitEvent(...args);
                that.handleComponentSubmit(...args);
              }
            }else{
              listeners.submit = function(...args){
                that.handleComponentSubmit(...args);
              }
            }
            const cancelEvent = listeners.close;
            // 是否有取消事件
            if(cancelEvent){
              listeners.close = function(...args){
                cancelEvent(...args);
                that.close();
              }
            }else{
              listeners.close = function(...args){
                that.close();
              }
            }
            vNode.componentOptions.listeners = listeners;
          }
          return vNode
        }
      }
    }
  },
  methods: {
    close(done) {
      if (this.beforeClose) this.beforeClose()
      if (done) {
        // elemeni.UI官网规定
        done()
      } else {
        this.visible = false
      }
    },
    handleComponentSubmit () {
      if (this.closeAfterSubmit) this.close()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>