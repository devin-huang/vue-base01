// 设置默认溢出显示数量
const spillDataNum = 1
// 设置隐藏函数
let timeout = false

let dataSize = null
let oldDataSize = null
let selectWrap = null
let selectTbody = null
let selectRow = null
let rowHeight = null
let showRowNum = null
let createElementTR = ''
let createElementTRHeight = null

let topPx = 0
let topNum = 0
let minTopNum = 0

let initScrollInfo = function (scrollTop = 0) {
  topPx = scrollTop - spillDataNum * rowHeight
  topNum = Math.round(topPx / rowHeight)
  minTopNum = dataSize - spillDataNum - showRowNum
  if (topNum > minTopNum) {
    topNum = minTopNum
  }
  if (topNum < 0) {
    topNum = topPx = 0
  }
}

let initDefine = function (el, binding, vnode, oldVnode) {
  dataSize = vnode.data.attrs['data-size']
  oldDataSize = Object.keys(oldVnode.data).length > 0 && oldVnode.data.attrs['data-size']
  if (dataSize === oldDataSize) {
    return
  }
  selectWrap = el.querySelector('.el-table__body-wrapper')
  selectTbody = selectWrap.querySelector('table tbody')
  selectRow = selectWrap.querySelector('table tr')
  if (!selectRow) {
    return false
  }
  rowHeight = selectRow.clientHeight
  showRowNum = Math.round(selectWrap.clientHeight / rowHeight)
  createElementTR = document.createElement('tr')
  createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
}

let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum)
  })
}

export default {
  name: 'loadmore',
  inserted: function (el, binding, vnode, oldVnode) {
    setTimeout(function () {
      // load start
      initDefine(el, binding, vnode, oldVnode)
      setRowDisableNone(topNum, showRowNum, binding)
      // load end
    }, 500)
  },
  componentUpdated: function (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      const hasOpenHeight = selectTbody && selectTbody.querySelectorAll('.openHeight').length
      if (hasOpenHeight) {
        selectTbody.querySelector('.openHeight').remove()
      }
      initDefine(el, binding, vnode, oldVnode)
      createElementTR && createElementTR.classList.add('openHeight')

      // createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
      selectTbody && selectTbody.append(createElementTR)
      // Resize Start
      window.addEventListener('resize', function () {
        const hasOpenHeight = selectTbody.querySelectorAll('.openHeight').length
        if (hasOpenHeight) {
          selectTbody.querySelector('.openHeight').remove()
        }
        rowHeight = selectRow.clientHeight
        showRowNum = Math.round(selectWrap.clientHeight / rowHeight)
        createElementTR = document.createElement('tr')
        createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight

        createElementTR.classList.add('openHeight')
        createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
        selectTbody.append(createElementTR)
        initScrollInfo()
        selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
        createElementTR.setAttribute(
          'style',
          `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
        )
        setRowDisableNone(topNum, showRowNum, binding)
      })
      // Resize End
      // 监听滚动后事件
      selectWrap && selectWrap.addEventListener('scroll', function () {
        initScrollInfo(this.scrollTop)
        selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
        createElementTR.setAttribute(
          'style',
          `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
        )
        setRowDisableNone(topNum, showRowNum, binding)
      })
    })
  }
}
