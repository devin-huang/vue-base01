// 设置默认溢出显示数量
const spillDataNum = 1
// 设置隐藏函数
let timeout = false
let firstLoad = true
// default
let dataSize = 0
let oldDataSize = 0
let selectWrap = null
let selectTbody = null
let selectRow = null
let rowHeight = 1
let showRowNum = 0
let createElementTR = ''
let createElementTRHeight = 0

// position
let headerHeight = null
let total = null
let fixedTbody = null
let fixedBodyWrapper = null
let tops = []
let firstTRchild = null

let topPx = 0
let topNum = 0
let minTopNum = 0

let initScrollInfo = function (scrollTop = 0) {
  fixedTbody = document.querySelectorAll('[class|=el-table__fixed] .el-table__body tbody')
  fixedBodyWrapper = document.querySelectorAll('[class|=el-table__fixed] .el-table__fixed-body-wrapper')
  topPx = scrollTop - spillDataNum * rowHeight
  topNum = topPx / rowHeight // Math.round(topPx / rowHeight)
  minTopNum = dataSize - spillDataNum - showRowNum
  if (topNum > minTopNum) {
    topNum = minTopNum
  }
  if (topNum < 0) {
    topNum = topPx = 0
  }
}

let initDefine = function (el, binding, vnode, oldVnode, status = true) {
  dataSize = vnode.data.attrs['data-size']
  oldDataSize = Object.keys(oldVnode.data).length > 0 && oldVnode.data.attrs['data-size']
  if (dataSize === oldDataSize) {
    return
  }
  selectWrap = el.querySelector('.el-table__body-wrapper')
  selectTbody = selectWrap.querySelector('table tbody')
  selectRow = selectWrap.querySelector('table tr')
  headerHeight = el.querySelector('.el-table__header-wrapper').clientHeight
  total = el.querySelector('.el-table__body').clientHeight
  firstTRchild = selectTbody.querySelector('tr')
  if (!selectRow && status) {
    return false
  }
  rowHeight = selectRow.clientHeight
  showRowNum = Math.ceil(selectWrap.clientHeight / rowHeight)
  createElementTR = document.createElement('tr')
  createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
}

// TABLE中展示的数据条数及区间
let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum)
  })
}

let appendTrElement = function () {
  const hasOpenHeight = selectTbody && selectTbody.querySelectorAll('.openHeight').length
  if (hasOpenHeight) {
    selectTbody.querySelector('.openHeight').remove()
  }
  selectTbody && selectTbody.append(createElementTR)
}

let fixedSetting = function () {
  let fixeds = document.querySelector('[class|=el-table__fixed]')
  fixeds.querySelectorAll('.el-table__fixed-body-wrapper').forEach(e => {
    tops = tops.concat(Number(e.style.top.replace('px', '')))
  })
  fixeds.querySelectorAll('.el-table__body tbody').forEach(e => {
    e.append(createElementTR)
  })
}

let handleResize = function (binding) {
  window.addEventListener('resize', function () {
    const hasOpenHeight = selectTbody.querySelectorAll('.openHeight').length
    if (hasOpenHeight) {
      selectTbody.querySelector('.openHeight').remove()
    }
    // Init
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
}

let scrollControlFixedColumn = function (scrollTop) {
  if (createElementTRHeight - topPx <= 0) {
    fixedTbody.forEach(e => {
      e.setAttribute('style', `transform: translateY(${-firstTRchild.clientHeight + (createElementTRHeight - topPx)}px)`)
    })
  } else if (scrollTop < headerHeight) {
    fixedTbody.forEach(e => {
      e.setAttribute('style', `transform: translateY(${-scrollTop}px)`)
    })
    fixedBodyWrapper.forEach(e => {
      e.setAttribute('style', `top:${headerHeight}px`)
    })
  } else {
    fixedBodyWrapper.forEach(e => {
      e.setAttribute('style', `top:${headerHeight}px`)
    })
    fixedTbody.forEach(e => {
      e.setAttribute('style', `transform: translateY(${-firstTRchild.clientHeight}px)`)
    })
  }
}

export default {
  name: 'loadmore',
  componentUpdated: function (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      // 初始化控制渲染条数
      if (firstLoad) {
        initDefine(el, binding, vnode, oldVnode, false)
        initScrollInfo()
        if (selectTbody && selectTbody.tagName == 'TBODY') {
          selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
          createElementTR && createElementTR.setAttribute(
            'style',
            `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
          )
          // fixed
          fixedSetting()
          setRowDisableNone(topNum, showRowNum, binding)
          firstLoad = !firstLoad
        }
      }
      initDefine(el, binding, vnode, oldVnode)
      createElementTR && createElementTR.classList.add('openHeight')
      appendTrElement()
      // Resize Start
      handleResize(binding)
      // Resize End
      // 监听滚动后事件
      selectWrap && selectWrap.addEventListener('scroll', function () {
        // init
        initScrollInfo(this.scrollTop)
        // scrollControlFixedColumn
        scrollControlFixedColumn(this.scrollTop)
        // Seting
        let top = createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0
        let transformTop = createElementTRHeight - topPx > 0 ? topPx : createElementTRHeight
        createElementTR.setAttribute(
          'style',
          `height: ${top}px;`
        )
        selectTbody.setAttribute(
          'style',
          `transform: translateY(${transformTop}px)`
        )
        createElementTR.setAttribute(
          'style',
          `height: ${top}px;`
        )
        setRowDisableNone(topNum, showRowNum, binding)
      })
    })
  }
}
