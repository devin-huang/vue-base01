/**
 * Created By Devin on 2019/01/23
 */

export function toTree (remoteRouters, localRouters) {
  const res = []
  remoteRouters.forEach(remote => {
    let _item = hasPermission(remote, localRouters)
    if (_item) {
      if (_item.children) {
        let _child = toTree(remote.childrenList, _item.children)
        _item.children = _child
      }
      res.push(_item)
    }
  })
  return res
}

function hasPermission (remote, localRouters) {
  return localRouters.filter(local => local.name === remote.name)[0]
}
