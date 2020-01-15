# vue-base-build

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 技术栈

[vue-cli3](https://cli.vuejs.org/guide/)

[axios](https://github.com/axios/axios)

[lodash](https://lodash.com/)

[vue-router](https://router.vuejs.org/)

[vuex](https://vuex.vuejs.org/)

[Element](http://element.eleme.io/#/zh-CN)

[v-chart](https://v-charts.js.org/#/en/)

[webpack](https://webpack.js.org/)

# Axios ( /src/utils.https.js )

  1.配置环境变量对应的路径

  2.请求配置：token(用户验证)  timezone (时效性)

  3.响应拦截器：防止非法访问

  4.封装GET/POST/DELETE/PUT

# vuex

  1.应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态(便于SPA多层级组件间依赖于同一状态值, 刷新即清空VUEX)

  2.dispatch 调用action中函数(可含异步处理)  / commit 调用mutation中函数(更改 Vuex 的 store 的状态的唯一方法)

  3.
  ```
  {
    state                      // 状态值
    mutation                   // 状态值方法
    action                     // 处理函数（包含触发commit -> 改变状态值）
  }
  src/store.js 实例化VUEX对象
  ```

  4.根据3的方式保存的对象将通过对应的 mapState / mapActions / mapGetter / mapMutation 获取值 或 函数

### action

```
dispatch(API, parameter) // 同一模块调用
dispatch(API, parameter, {root: true}) // 非同模块调用
this.$store.dispatch(API, parameter)   // 全局调用

// For example:
dispatch('listUpiTask', { pageSize: 30 })
```

# component

**遵循低耦合方式prop传递**

~~\<test :data={id: id, name: name,type: type} \>\</test>~~

\<test \:id\=\"id\" \:name\=\"name\" \:type\=\"type\" \>\<\/test\>

**父组件调用子组件方法/子组件调用父组件方法**

```
this.$refs[].fn()
this.$parent.fn()
```

**多层组件间传递属性/事件**

```
1.  vuex
2.  eventBus 定义全局变量 [使用方式](https://alligator.io/vuejs/global-event-bus/)
3.  $attrs
    $listeners
    inheritAttrs
```

> 注意: inputListeners （合并父级添加所有的监听器与子级自定义监听器）

![](https://github.com/devin-huang/devin-huang.github.io/raw/master/img/pubilc/vueDemo/linster.png)


# layout

```
使用fixed布局

1.layout 放置在components

2.main.js 中设置所需layout

3.page 在route-view设置响应式高度
```

![](https://github.com/devin-huang/devin-huang.github.io/blob/master/img/pubilc/vueDemo/layout.jpg)

**Page组件制作响应式table高度**
	
	侧边导航配置与递归组件
	
	table部分根据load或者resize时计算宽高实现自适应[实际侦听container load,resize事件获取高度：`main = container - (header + pagination) ]`
  
	获取clientHeight高度（需要原生load与resize事件）
	
	侦听clientHeight变化改变tableHeight

  *注意不能定义组件与HTML标签重名(組件内的name也不能与标签重名且与文件名一一对应)*


# router && permission

### router

> 使用 route 渲染侧边导航

> 使用 [Router meta](https://router.vuejs.org/zh/guide/advanced/meta.html) 验证访问 / 操作

### permission

  两种权限控制（推荐第2种）

  第1种.
    beforeEach + router[ meta{ access:['admin', 'user'] } ] access存放后端返回的用户组
    注：当用户组类别过多难以维护修改,所以常规使用第2种

  第2种.
    Axios [token] + beforeEach + addRoute + API（菜单列表与模块操作权限）

> 路由权限 =》 后端根据登录用户返回该用户分配角色权限的路由列表API

> 操作控制 =》 后端根据登录用户设置的角色返回所以操作控制API

	1.src/router constantRouterMap设置常规路由 asyncRouterMap设置前端全菜单路由
  
	2.src/permission 使用router.beforeEach()每次路由跳转执行并判断已登录或返回新路由通过addRoutes()重现渲染
	
	3.module/permission 将用户信息及角色对应路由列表写入vuex
  
	4.utils/menuTree 将前端路由匹配后端返回当前角色的菜单列表得出新前端路由（匹配的规则在后端配置）
    
	5.module/getters 使用store.getter更新视图得到新路由
	
	6.utils/permission 根据后端操作控制API获取是否有权限操作/编辑/删除
  
	7.main.js 引用src/permission 与 utils/permission

	8.每个模块创建独立 permission 文件控制权限通过 mixins 引用到各个页面
 
# filter  / Mixin

> filter
  utils/filter（需原型链 （prototype）上绑定）
  组件内：filters: {}
  函数：
  ```
  import Vue from 'vue'
  Vue.filter('currency')(this.value,'$')
  ```

> Mixin 自定义全局Vue对象（data, methods, created, mounted等） -- 通俗解释就是把Mixin中的对象累加到对应的Vue对象中
  utils/mixin （For Example：登陆用户 / 每页默认参数等 / 打印）
  组件内：Mixins: [] 存放权限控制

# WebStorm + ESlint

- WebStorm：
`File -> Settings -> Languages & Frameworks -> Javascript -> Code Quality Tools -> ESLint -> Enable -> ESlint package`

- 配置.eslintrc.js文件

- 安装依赖：
```
"eslint-config-standard": "^10.2.1",
"eslint-plugin-import": "^2.7.0",
"eslint-plugin-node": "^5.2.0",
"eslint-plugin-promise": "^3.4.0",
"eslint-plugin-standard": "^3.0.1",
```



# Webpack

  安装第三方库依赖的方式（唯有引用时才会去）/ 生产环境清除log/debug等

- 配置各个环境变量：根路径 / 图片路径 / login路径 等
  
	npm run build 报错
	
	TypeError: Cannot read property 'minify' of undefined
  
	需要安装依赖： npm i terser@3.14

  (详细查看webpack文章)[https://github.com/devin-huang/devin-huang.github.io/blob/master/_posts/2019-03-18-Webpack%E6%8F%92%E4%BB%B6.md]
	
	运行dist
  
	安装服务器
	$ npm install -g http-server
  
	dist目录用命令行运行 http-server （注意是在dist目录运行,压缩后会http请求路径会自动切换到生产环境，生产环境在utils/https.js配置）

- 切换部署环境
   	1. 参考 `RESTful_API`项目的 webpack设置
	2. 如果使用VUE-CLI3则 `--mode production` 即可
	
- 图片引用 (直接引用的路径无法正确获取资源 或 编译BASE64)
   	1. require(`@/assets/**.png`)
	2. 如果使用VUE-CLI3的图片资源在public中 `${process.env.BASE_URL}/images/**.png` 即可
	
- `*.min.js from UglifyJs`
	UglifyJs 在处理 webpack 构建的 js 文件时出错原因就是文件里存在es6代码，而 UglifyJs 只能处理 ECMAScript 5代码;
	处理方式: `/node_modules/*`默认被exclude，使用`babel-loader`的 include 手动添加需要解析文件即可;
	参考: https://juejin.im/post/5d24619fe51d451061721158

# Storage



# 其他

### scrollbar

el-scrollbar饿了么内置，需要设置样式：height: 100% 与 calc:(100% + 15)

### vue-lazyload

设置默认加载前图片与加载失败时图片



# [Vue warn]

### Failed to mount component: template or render function not defined.

```
PATH: webpack.base.conf.js

SOLVE:

resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src')
    }
  }
```

### cannot find module 'prettier'

```
npm uninstall prettier
npm install prettier
```

# jenlins (staging环境)

```
rm -rf node_modules
npm install 
npx vue-cli-service build --mode staging
```

