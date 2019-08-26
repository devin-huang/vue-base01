const filters = {
  // 价格格式
  /* places 保留小数位数 ,symbol货币符号 */
  currency: (value, places, symbol, thousand, decimal) => {
    if (!value) {
      return ''
    }
    value = value.toString()
    return formatMoney(value, symbol, places, thousand, decimal)
    function formatMoney (number, symbol, places, thousand, decimal) {
      number = number || 0
      places = !isNaN((places = Math.abs(places))) ? places : 2
      symbol = symbol !== undefined ? symbol : '$'
      thousand = thousand || ','
      decimal = decimal || '.'
      var negative = number < 0 ? '-' : '',
        i =
          parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
        j = (j = i.length) > 3 ? j % 3 : 0
      return (
        symbol +
        negative +
        (j ? i.substr(0, j) + thousand : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
        (places
          ? decimal +
            Math.abs(number - i)
              .toFixed(places)
              .slice(2)
          : '')
      )
    }
  }
}

Object.defineProperty(filters, 'install', {
  value: (Vue, Option) => {
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
    Vue.$filters = filters
    Vue.prototype.$filters = filters
  }
})

export default filters
