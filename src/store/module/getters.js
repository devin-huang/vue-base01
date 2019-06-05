const getters = {
  // clientHeight: state => {
  //   return `原高度${state.App.clientHeight} 通过getters 获得新高度 ${state.App
  //     .clientHeight + 500}`
  // },
  permissionRouters: state => state.Permission.routers,
  addRouters: state => state.Permission.addRouters
}

export default getters;
