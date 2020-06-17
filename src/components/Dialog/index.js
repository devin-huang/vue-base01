import Vue from 'vue'
import DialogWrapper from './DialogWrapper'
const DataPicker = () => import('../DatePicker')
const Input = () => import('element-ui/packages/input')

// 声明Vue组件
const vueDialog = Vue.extend({
  name: 'dialogContainer',
  data () {
    return {
      visible: true,
      options: null
    }
  },
  render (h) {
    return h(DialogWrapper, {
      props: this.options
    })
  }
})

// 初始化Dialog组件
const dialogs = []
newDialog({ render: {} })
const createEle = dialogs[0].$createElement

// 创建Dialog组件并挂载到body
export function newDialog(opt) {
  // 配置Dialog的props参数
  const dialog = new vueDialog({data: {options: opt}})
  //$mount 生产DOM $el
  dialog.$mount()
  //嵌套Dialog数量
  document.body.appendChild(dialog.$el)
  if (dialogs.length < 2) {
    dialogs.push(dialog);
  }
}

// 弹框
export const showDialog = (opt) => {
  const index = dialogs.findIndex(dialog => !dialog.$children[0].visible);
  if (index >= 0) {
    const dialog = dialogs[index];
    dialog.options = opt;
    //显示弹框
    dialog.$children[0].visible = true
  } else {
    newDialog(opt)
  }
}

// 异步弹框 (参数说明：前两个Dialog设置，后两个是子组件设置)
export const showAsyncDialog = (component, dialogOpt , attrs, events) => {
  component().then(node=> {
    // 导入组件手动实例化：通过node.default获取组件并通过内置 $createElement 生成 VNode组件
    dialogOpt.render = createEle(node.default, {attrs: attrs, on: events})
    showDialog(dialogOpt)
  })
}

export const showAsyncDataPicker = (type, placeholder, closeCallback) => {
  showAsyncDialog(DataPicker,
    {title: 'DataPicker', top: '50vh'},
    {type: type, value: '', placeholder: placeholder},
    {
      close: closeCallback,
      show: () => console.log(123)
    }
  )
}


export const showAsyncInput = () => {
  showAsyncDialog(Input,
    {title: 'ElInput', top: '20vh'},
    {type: 'dates',value: '', placeholder: "ElInput"},
    {
      input: (e) => {
        console.log(e, 'TEST')
      }
    }
  )
}


export const showSwitch = function (array, callback) {
  showDialog({
    title: 'Switch',
    width: '1100px',
    beforeClose: () => {
      console.log('beforeClose')
    },
    render () {
      return (
        // 此tabs应该二次封装，这里仅为了展示效果
        <el-tabs class={'item'} onTab-click={callback} value={'first'}>
          {array.map(e => {
            return <el-tab-pane class={'item'} label={e.label} name={e.name}></el-tab-pane>
          })}
        </el-tabs>
      )
    }
  })
}