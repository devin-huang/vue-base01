const configureProductPlugin = []
if (process.env.NODE_ENV === 'production') {
  // 生产环境禁止输出console（可限制禁止的console类型，具体查看官网）
  configureProductPlugin.push(['transform-remove-console'])
}

module.exports = {
  presets: ["@vue/app"],
  plugins: configureProductPlugin
}