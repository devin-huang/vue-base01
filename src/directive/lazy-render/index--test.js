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
      // 每页原显示条数
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
      let rowHeight = selectRow.clientHeight
      let showRowNum = Math.round(selectWrap.clientHeight / rowHeight)
      let createElementTR = document.createElement('tr')
      // 注意：在resize中会有scroll不精准，并不影响实际使用
      let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
      // console.log(dataSize, createElementTRHeight)
      createElementTR.classList.add('openHeight')
      createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
      selectTbody.append(createElementTR)
      
      // load start
      // let topPx = 0 - spillDataNum * rowHeight
      // let topNum = Math.round(topPx / rowHeight)
      // let minTopNum = dataSize - spillDataNum - showRowNum
      //
      // if (topNum > minTopNum) {
      //   topNum = minTopNum
      // }
      // if (topNum < 0) {
      //   topNum = topPx = 0
      // }
      // selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
      // createElementTR.setAttribute(
      //   'style',
      //   `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
      // )
      // setRowDisableNone(topNum, showRowNum, binding)
      // load end
      
      // window.addEventListener('resize', function () {
      //
      //   const hasOpenHeight = selectTbody.querySelectorAll('.openHeight').length
      //   if (hasOpenHeight) {
      //     selectTbody.querySelector('.openHeight').remove()
      //   }
      //   rowHeight = selectRow.clientHeight
      //   showRowNum = Math.round(selectWrap.clientHeight / rowHeight)
      //   createElementTR = document.createElement('tr')
      //   // 注意：在resize中会有scroll不精准，并不影响实际使用
      //   createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
      //
      //   createElementTR.classList.add('openHeight')
      //   createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
      //   selectTbody.append(createElementTR)
      //   let topPx = 0 - spillDataNum * rowHeight
      //   let topNum = Math.round(topPx / rowHeight)
      //   let minTopNum = dataSize - spillDataNum - showRowNum
      //
      //   if (topNum > minTopNum) {
      //     topNum = minTopNum
      //   }
      //   if (topNum < 0) {
      //     topNum = topPx = 0
      //   }
      //   selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
      //   createElementTR.setAttribute(
      //     'style',
      //     `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
      //   )
      //   setRowDisableNone(topNum, showRowNum, binding)
      // })
      
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
          `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
        )
        setRowDisableNone(topNum, showRowNum, binding)
      })
    })
  }
}
