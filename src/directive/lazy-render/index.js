// 设置默认溢出显示数量
const spillDataNum = 1
// 设置隐藏函数
let timeout = false

let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum)
  })
}

export default {
  name: 'loadmore',
  componentUpdated: function (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      const dataSize = vnode.data.attrs['data-size']
      const oldDataSize = oldVnode.data.attrs['data-size']
      if (dataSize === oldDataSize) {
        return
      }
      const selectWrap = el.querySelector('.el-table__body-wrapper')
      const selectTbody = selectWrap.querySelector('table tbody')
      const selectRow = selectWrap.querySelector('table tr')
      if (!selectRow) {
        return
      }
      const rowHeight = selectRow.clientHeight
      let showRowNum = Math.round(selectWrap.clientHeight / rowHeight)
      const createElementTR = document.createElement('tr')
      // 注意：在resize中会有scroll不精准，并不影响实际使用
      let createElementTRHeight =
        (dataSize - showRowNum - spillDataNum) * rowHeight
      createElementTR.setAttribute(
        'style',
        `height: ${createElementTRHeight}px;`
      )
      selectTbody.append(createElementTR)

      // 监听滚动后事件
      selectWrap.addEventListener('scroll', function () {
        let topPx = this.scrollTop - spillDataNum * rowHeight
        let topNum = Math.round(topPx / rowHeight)
        let minTopNum = dataSize - spillDataNum - showRowNum
        if (topNum > minTopNum) {
          topNum = minTopNum
        }
        if (topNum < 0) {
          topNum = topPx = 0
        }
        selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
        createElementTR.setAttribute(
          'style',
          `height: ${
            createElementTRHeight - topPx > 0
              ? createElementTRHeight - topPx
              : 0
          }px;`
        )
        setRowDisableNone(topNum, showRowNum, binding)
      })
    })
  }
}
